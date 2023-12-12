import { forwardRef, useEffect } from 'react'
import {
    Slide,
    Dialog,
    Button,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Grid,
    Typography,
    Skeleton,
} from '@mui/material'
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
} from '@mui/x-data-grid'
import { TransitionProps } from '@mui/material/transitions'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../redux/store'
import { setDialog } from '../../../redux/slices/dialogSlice'
import useResponsive from '../../../hooks/useResponsive'
import Scrollbar from '../../../components/scrollbar'
import PhagesInCRISPRAnalytic from './components/PhagesInCRISPRAnalytic'
import { useSnackbar } from '../../../components/snackbar'
import { useLazyGetStrainDetailsByAssembly } from '../../../GraphQl/Queries/getStrainDetailsByAssembly'
import { useLocales } from '../../../locales'

const Transition = forwardRef(
    (
        props: TransitionProps & {
            children: React.ReactElement
        },
        ref: React.Ref<unknown>
    ) => <Slide direction="up" ref={ref} {...props} />
)

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    )
}

export default function CrisprDialog() {
    const dialog = useAppSelector((state) => state.dialog)
    const dispatch = useDispatch()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const [getStrainDetailsByAssembly, { data, loading }] =
        useLazyGetStrainDetailsByAssembly(true)
    const { translate } = useLocales()

    const handleClose = () => {
        closeSnackbar()
        dispatch(setDialog(''))
    }
    const strainInformation = data?.getInformationByAssembly || {
        strain: '',
        assembly: '',
        accessionNumberRf: '',
        accessionNumberGenBank: '',
        specie: '	',
        phylotype: '',
        consensusRepeatSequences: '',
        phagesInCrisprArray: [],
        availablePhages: 0,
        lengthCrisprArray: 0,
        isCrispr: false,
        crisprType: '',
        observation: '',
        scoreCrisprIdentify: 0,
        listPotentialPhages: [],
    }
    const isDesktop = useResponsive('up', 'md')

    const {
        strain,
        assembly,
        accessionNumberRf,
        accessionNumberGenBank,
        specie,
        phylotype,
        consensusRepeatSequences,
        phagesInCrisprArray,
        lengthCrisprArray,
        availablePhages,
        isCrispr,
        crisprType,
        observation,
        scoreCrisprIdentify,
        listPotentialPhages,
    } = strainInformation

    const columns = [
        { field: 'phageName', headerName: 'Phage name', width: 500 },
    ]

    useEffect(() => {
        if (dialog.open && isCrispr && !loading) {
            enqueueSnackbar(
                `${translate('dashboard.notifications.withCrispr')}`
            )
        }
        if (dialog.open && !isCrispr && !loading) {
            enqueueSnackbar(
                `${translate('dashboard.notifications.noCrispr')}`,
                { variant: 'error' }
            )
        }
    }, [loading])

    useEffect(() => {
        if (dialog.assembly) {
            getStrainDetailsByAssembly({
                variables: {
                    assembly: dialog.assembly,
                },
            })
        }
    }, [dialog.assembly])
    return (
        <Dialog
            open={dialog.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth={isDesktop}
            maxWidth="md"
        >
            <DialogTitle id="alert-dialog-slide-title"></DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {loading ? (
                        <Skeleton variant="text" width="100%" height={80} />
                    ) : (
                        <Scrollbar sx={{ height: isCrispr ? 500 : 250 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} textAlign="center">
                                    <Typography variant="h4" color="primary">
                                        Strain information
                                    </Typography>
                                </Grid>
                                <CardDetails
                                    title={'Strain name'}
                                    description={strain}
                                />
                                <CardDetails
                                    title={'Assembly'}
                                    description={assembly}
                                />
                                <CardDetails
                                    title={'Species'}
                                    description={specie}
                                />
                                <CardDetails
                                    title={'Phylotype'}
                                    description={phylotype}
                                />
                                <CardDetails
                                    title={'RefSeq Accession Number'}
                                    description={accessionNumberRf}
                                />
                                <CardDetails
                                    title={'GenBank Accession Number'}
                                    description={accessionNumberGenBank}
                                />
                                <CardDetails
                                    title={'Crispr Type'}
                                    description={crisprType}
                                />
                                <CardDetails
                                    title={'Score (CrisprIdentify)'}
                                    description={scoreCrisprIdentify.toString()}
                                />
                            </Grid>
                            <CardDetails
                                title={'Observation'}
                                description={observation}
                            />
                            {isCrispr && (
                                <Grid container spacing={2} pt={2}>
                                    <Grid item xs={12} textAlign="center">
                                        <Typography
                                            variant="h4"
                                            color="primary"
                                        >
                                            CRISPR details
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <PhagesInCRISPRAnalytic
                                            chart={{
                                                series: [
                                                    {
                                                        label: 'In CRISPR',
                                                        value: phagesInCrisprArray.length,
                                                    },
                                                    {
                                                        label: 'Available',
                                                        value: availablePhages,
                                                    },
                                                ],
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} textAlign="center">
                                        <Typography variant="h6">
                                            {'Consensus repeat sequences'}
                                        </Typography>
                                        <Typography>
                                            {consensusRepeatSequences}
                                        </Typography>
                                    </Grid>
                                    <CardDetails
                                        title={'Number of array'}
                                        description={lengthCrisprArray.toString()}
                                    />
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        textAlign="center"
                                    >
                                        <Typography variant="h6">
                                            Phages
                                        </Typography>
                                        {phagesInCrisprArray.length > 0 ? (
                                            <Scrollbar sx={{ height: 100 }}>
                                                {phagesInCrisprArray.map(
                                                    (phageName) => (
                                                        <Typography
                                                            key={phageName}
                                                            variant="body1"
                                                        >
                                                            {'*'}
                                                            {phageName}
                                                        </Typography>
                                                    )
                                                )}
                                            </Scrollbar>
                                        ) : (
                                            <Typography
                                                variant="body1"
                                                textAlign="center"
                                            >
                                                No phages detected
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={12}
                                        textAlign="center"
                                    >
                                        <Typography variant="h6">
                                            Potential effective phages
                                        </Typography>

                                        <div
                                            style={{
                                                height: 300,
                                                width: '100%',
                                            }}
                                        >
                                            <DataGrid
                                                disableColumnMenu
                                                disableColumnSelector
                                                disableRowSelectionOnClick
                                                rows={listPotentialPhages}
                                                columns={columns}
                                                components={{
                                                    Toolbar: CustomToolbar,
                                                }}
                                                getRowId={(row: any) =>
                                                    row.phageName
                                                }
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            )}
                        </Scrollbar>
                    )}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={handleClose}>
                    {`${translate('dashboard.buttons.accept')}`}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

function CardDetails({
    title,
    description,
}: {
    title: string
    description: string
}) {
    return (
        <Grid item xs={12} md={6} textAlign="center">
            <div style={{ padding: '0% 2% 0% 2%' }}>
                <Typography variant="h6">{title}</Typography>
                <Typography>{description}</Typography>
            </div>
        </Grid>
    )
}
