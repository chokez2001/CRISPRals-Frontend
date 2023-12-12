// form
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import { FormHelperText } from '@mui/material'
//
import { UploadAvatar, Upload, UploadBox, UploadProps } from '../upload'

// ----------------------------------------------------------------------

interface Props extends Omit<UploadProps, 'file'> {
    name: string
    multiple?: boolean
    disableButton?: boolean
}

// ----------------------------------------------------------------------

export function RHFUploadAvatar({ name, ...other }: Props) {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <UploadAvatar
                        accept={{
                            'text/fasta': [
                                '.fasta',
                                '.fna',
                                '.fa',
                                '.fsa',
                                '.fas',
                                '.faa',
                                '.ffn',
                                '.frn',
                                '.txt',
                            ],
                        }}
                        error={!!error}
                        file={field.value}
                        {...other}
                    />

                    {!!error && (
                        <FormHelperText
                            error
                            sx={{ px: 2, textAlign: 'center' }}
                        >
                            {error.message}
                        </FormHelperText>
                    )}
                </div>
            )}
        />
    )
}

// ----------------------------------------------------------------------

export function RHFUploadBox({ name, ...other }: Props) {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <UploadBox files={field.value} error={!!error} {...other} />
            )}
        />
    )
}

// ----------------------------------------------------------------------

export function RHFUpload({
    name,
    multiple,
    helperText,
    disableButton,
    ...other
}: Props) {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) =>
                multiple ? (
                    <Upload
                        multiple
                        disableButton={disableButton}
                        accept={{
                            'text/fasta': [
                                '.fasta',
                                '.fna',
                                '.fa',
                                '.fsa',
                                '.fas',
                                '.faa',
                                '.ffn',
                                '.frn',
                                '.txt',
                            ],
                        }}
                        files={field.value}
                        error={!!error}
                        helperText={
                            (!!error || helperText) && (
                                <FormHelperText error={!!error} sx={{ px: 2 }}>
                                    {error ? error?.message : helperText}
                                </FormHelperText>
                            )
                        }
                        {...other}
                    />
                ) : (
                    <Upload
                        accept={{
                            'text/fasta': [
                                '.fasta',
                                '.fna',
                                '.fa',
                                '.fsa',
                                '.fas',
                                '.faa',
                                '.ffn',
                                '.frn',
                                '.txt',
                            ],
                        }}
                        file={field.value}
                        error={!!error}
                        helperText={
                            (!!error || helperText) && (
                                <FormHelperText error={!!error} sx={{ px: 2 }}>
                                    {error ? error?.message : helperText}
                                </FormHelperText>
                            )
                        }
                        {...other}
                    />
                )
            }
        />
    )
}
