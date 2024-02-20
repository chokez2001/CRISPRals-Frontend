import { useTheme } from '@mui/material/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import JsonTable from './components/CsvViewer'

import * as Yup from 'yup'
import LoadingScreen from '../../../components/loading-screen/LoadingScreen'
import {
    Stack,
    Backdrop,
    Typography,
    StackProps,
    Button,
    Box,
    FormControlLabel,
    Radio,
} from '@mui/material'
import FormProvider, { RHFUpload } from '../../../components/hook-form'
import { use, useCallback, useEffect, useState } from 'react'
import {
    useLazyLaboratoryAnalysis,
    useLazyGetUselessPhages,
} from '../../../GraphQl/Queries/laboratoryAnalisis'
import Page500 from '../../../components/errors/505'
import { useSnackbar } from '../../../components/snackbar'
import { useLocales } from '../../../locales'
import { de } from 'date-fns/locale'
import { set } from 'lodash'
import { json } from 'stream/consumers'

export const FormSchema = Yup.object().shape({
    multiUpload: Yup.array().min(1, 'Must have at least 1 fasta file'),
})

type FormValuesProps = {
    multiUpload: File[]
}
const defaultValues = {
    multiUpload: [],
}

export default function UploadFasta() {
    const theme = useTheme()

    const [fastaContents, setfastaContents] = useState<string[]>([])
    const [fastaResponse, setfastaResponse] = useState<object[]>([])
    const [fastaZipResponse, setfastaZipResponse] = useState<object[]>([])
    const [fastaCasResponse, setfastaCasResponse] = useState<object[]>([])
    const [fastaSpacersResponse, setfastaSpacersResponse] = useState<string[]>([])
    const [possiblePhages, setpossiblePhages] = useState<object[]>([])
    const [selectedAnalysis, setSelectedAnalysis] = useState('')
    
    // 'Sequevar determination',
    // 'Phylotype determination',
    const analysisOptions = [
        'CRISPRidentify analysis'
    ]
    const [laboratoryAnalysis, { data, loading, error }] =
        useLazyLaboratoryAnalysis(true)

    const [ getUselessPhages ] = useLazyGetUselessPhages(true);

    const { enqueueSnackbar } = useSnackbar()
    const { translate } = useLocales()

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(FormSchema),
        defaultValues,
    })
    const { watch, setValue } = methods

    const values = watch()

    const handleDropMultiFile = useCallback(
        (acceptedFiles: File[]) => {
            const files = values.multiUpload || []

            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )

            setValue('multiUpload', [...files, ...newFiles], {
                shouldValidate: true,
            })
        },
        [setValue, values.multiUpload]
    )

    async function handleUploadMultiFile() {
        if (selectedAnalysis) {
            const auxfastaContents: string[] = []

            values.multiUpload.map((fastaFile) => {
                const reader = new FileReader()
                reader.readAsText(fastaFile)
                reader.onload = function () {
                    const rawLog = reader.result
                    auxfastaContents.push(rawLog as string)
                }
            })

            await new Promise<void>((resolve) => {
                const intervalId = setInterval(() => {
                    if (auxfastaContents.length > 0) {
                        clearInterval(intervalId)
                        resolve()
                    }
                }, 100)
            })

            setfastaContents(auxfastaContents)

            setValue('multiUpload', [], { shouldValidate: true })
        }
    }

    useEffect(() => {
        if (fastaContents.length > 0 && selectedAnalysis) {
            laboratoryAnalysis({
                variables: {
                    fastaContent: fastaContents,
                    analysisType: selectedAnalysis,
                },
            })
        }
    }, [fastaContents, selectedAnalysis])



    const parseJSON = (jsonString: string) => {
        try {
          return JSON.parse(jsonString);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          return null;
        }
      };


    useEffect(() => {
        const {
          fastaAnalisis = [],
          zipFiles = [],
          casSummary = [],
          spacers = [],
        } = data?.laboratoryAnalysis || {};
      
      
        const jsonArray = fastaAnalisis.map(parseJSON).filter(Boolean);
        const jsonArrayZip = zipFiles.map(parseJSON).filter(Boolean);
        const jsonArrayCas = casSummary.map(parseJSON).filter(Boolean);
        const jsonArraySpacers = spacers.map(parseJSON).filter(Boolean);
        const spacersList: string[] = jsonArraySpacers.map((item) => item.Spacer);
      
        setfastaResponse(jsonArray);
        setfastaZipResponse(jsonArrayZip);
        setfastaCasResponse(jsonArrayCas);
        setfastaSpacersResponse(spacersList);
      
      
      }, [
        data?.laboratoryAnalysis.fastaAnalisis,
        data?.laboratoryAnalysis.zipFiles,
        data?.laboratoryAnalysis.casSummary,
        data?.laboratoryAnalysis.spacers,
      ]);

    useEffect(() => {
        if (loading) {
            enqueueSnackbar(
                `${translate('dashboard.notifications.takeLongTime')}`,
                {
                    variant: 'error',
                }
            )
        }
    }, [loading])
    if (error) {
        return <Page500 />
    }

    const handleSearchPossiblePhages = async () => {
        try {
      
          const result = await getUselessPhages({
            variables: {
              spacers: fastaSpacersResponse,
            },
          });
      
          const { uselessPhages = [] } = result?.data?.getUselessPhages || {};
          const jsonArrayphages = uselessPhages.map((phageString) => parseJSON(phageString)).filter(Boolean);
      
          setpossiblePhages(jsonArrayphages);
       
        } catch (error) {
          console.error('Error en la consulta:', error);
        }
      };
      


    return (
        <>
            {fastaResponse.length === 0 && (
                <>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Analysis Options
                        </Typography>
                        <div
                            style={{
                                display: 'grid',
                                margin: '3% 7% 3% 5%',
                                gridTemplateColumns:
                                    'repeat(auto-fill, minmax(200px, 1fr))',
                                gap: '10px',
                            }}
                        >
                            {analysisOptions.map((option) => (
                                <FormControlLabel
                                    key={option}
                                    control={
                                        <Radio
                                            checked={
                                                selectedAnalysis === option
                                            }
                                            onChange={() => {
                                                setSelectedAnalysis(option)
                                            }}
                                            size="medium"
                                            value={option}
                                        />
                                    }
                                    label={option}
                                    style={{ width: '300px' }}
                                />
                            ))}
                        </div>
                    </Box>
                    {loading && (
                        <Backdrop
                            open
                            sx={{
                                zIndex: (themeTwo) => themeTwo.zIndex.modal + 1,
                            }}
                        >
                            <LoadingScreen />
                        </Backdrop>
                    )}
                    <FormProvider methods={methods}>
                        <Block label="Fasta File Upload">
                            <RHFUpload
                                multiple
                                disableButton={!selectedAnalysis}
                                thumbnail
                                name="multiUpload"
                                maxSize={10240000}
                                onDrop={handleDropMultiFile}
                                onRemove={(inputFile) =>
                                    setValue(
                                        'multiUpload',
                                        values.multiUpload &&
                                            values.multiUpload?.filter(
                                                (file) => file !== inputFile
                                            ),
                                        { shouldValidate: true }
                                    )
                                }
                                onRemoveAll={() =>
                                    setValue('multiUpload', [], {
                                        shouldValidate: true,
                                    })
                                }
                                onUpload={() => handleUploadMultiFile()}
                            />
                        </Block>
                    </FormProvider>
                </>
            )}
            {fastaResponse.length > 0 && (
                <>
                    <Button
                        onClick={() => {
                            setfastaResponse([])
                            setfastaContents([])
                            setSelectedAnalysis('')
                            setValue('multiUpload', [], {
                                shouldValidate: true,
                            })
                        }}
                        style={{ alignSelf: 'flex-start' }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 14 4 9l5-5" />
                            <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
                        </svg>
                    </Button>
                    <div>
                        <Typography
                            variant="h4"
                            gutterBottom
                            style={{
                                flex: 1,
                                textAlign: 'center',
                                margin: '1rem',
                            }}
                        >
                            {selectedAnalysis}
                        </Typography>
                    </div>

                    <JsonTable
                        jsArray={JSON.stringify(fastaResponse)}
                        zipArray={JSON.stringify(fastaZipResponse)}
                    />
                    {fastaCasResponse?.length > 0 && (
                        <>
                            <Typography
                                variant="h5"
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    margin: '1rem',
                                }}
                            >
                                Cas Summary
                            </Typography>
                            <JsonTable
                                jsArray={JSON.stringify(fastaCasResponse)}
                                zipArray={JSON.stringify(null)}
                            />
                        </>
                    )}
                    <>
                        {fastaSpacersResponse?.length > 0 &&
                            selectedAnalysis === 'CRISPRidentify analysis' &&
                            possiblePhages?.length === 0 && (
                                <>
                                    <Button
                                        onClick={handleSearchPossiblePhages}
                                        size="small"
                                        variant="contained"
                                        style={{
                                            alignSelf: 'flex-start',
                                            margin: '1rem',
                                        }}
                                    >
                                        Search phages with similarity 
                                    </Button>
                                </>
                            )}

                        {possiblePhages?.length > 0 && (
                            <>
                                <Typography
                                    variant="h5"
                                    style={{
                                        flex: 1,
                                        textAlign: 'center',
                                        margin: '1rem',
                                        paddingTop: '2rem',
                                    }}
                                >
                                    Possible Phages
                                </Typography>
                                <JsonTable
                                    jsArray={JSON.stringify(possiblePhages)}
                                    zipArray={JSON.stringify(null)}
                                />
                            </>
                        )}
                    </>
                </>
            )}
        </>
    )
}

interface BlockProps extends StackProps {
    label?: string
    children: React.ReactNode
}

function Block({ label = 'RHFTextField', sx, children }: BlockProps) {
    return (
        <Stack spacing={1} sx={{ width: 1, ...sx }}>
            <Typography
                variant="caption"
                sx={{
                    textAlign: 'right',
                    fontStyle: 'italic',
                    color: 'text.disabled',
                }}
            >
                {label}
            </Typography>
            {children}
        </Stack>
    )
}
