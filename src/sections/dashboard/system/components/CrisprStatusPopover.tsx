import {
    Button,
    Typography,
    FormControlLabel,
    Checkbox,
    Stack,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import BadgeStatus from '../../../../components/badge-status'
import Iconify from '../../../../components/iconify'
import MenuPopover from '../../../../components/menu-popover'
import { useLocales } from '../../../../locales'
import {
    resetCrisprStatus,
    setCrisprStatus,
} from '../../../../redux/slices/filtersSlice'
import { useAppSelector } from '../../../../redux/store'
import { CRISPR_STATUS_ENUM } from '../../../../types/database'

const LabelCheckbox = ({
    labelText,
    backgroundColor,
}: {
    labelText: string
    backgroundColor: string
}) => (
    <Stack direction="row" spacing={1} alignItems="center">
        <BadgeStatus size="small" sx={{ backgroundColor }} />
        <Typography>{labelText}</Typography>
    </Stack>
)
const CrisprStatusPopover = () => {
    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget)
    }
    const { translate } = useLocales()

    const crisprStatus = useAppSelector((state) => state.filters.crisprStatus)

    const dispatch = useDispatch()

    const handleClosePopover = () => {
        setOpenPopover(null)
    }

    const { WITH_CRISPR, NO_CRISPR, NONE } = CRISPR_STATUS_ENUM
    const allOptionsSelected =
        crisprStatus.includes(NO_CRISPR) &&
        crisprStatus.includes(WITH_CRISPR) &&
        crisprStatus.includes(NONE)
    return (
        <>
            <Button
                onClick={handleOpenPopover}
                variant="outlined"
                fullWidth
                size="large"
                sx={{
                    height: 56,
                    justifyContent: 'space-between',
                    borderColor: 'action.disabledBackground',
                }}
                endIcon={
                    <Iconify
                        icon={
                            openPopover ? 'mdi:chevron-up' : 'mdi:chevron-down'
                        }
                        sx={{ color: 'action.active' }}
                    />
                }
            >
                <BadgeStatus
                    size="small"
                    sx={{ backgroundColor: 'primary.main' }}
                />
                <Typography>{`${translate(
                    'dashboard.filters.crisprStatus'
                )}`}</Typography>
            </Button>
            <MenuPopover
                open={openPopover}
                onClose={handleClosePopover}
                sx={{ width: 200, p: 2 }}
            >
                <Stack spacing={2}>
                    <FormControlLabel
                        label={
                            <LabelCheckbox
                                labelText={`${translate(
                                    'dashboard.filters.all'
                                )}`}
                                backgroundColor="primary.dark"
                            />
                        }
                        control={
                            <Checkbox
                                checked={allOptionsSelected}
                                indeterminate={!allOptionsSelected}
                                onChange={() => dispatch(resetCrisprStatus(''))}
                            />
                        }
                        sx={{ marginLeft: 0 }}
                    />
                    <FormControlLabel
                        label={
                            <LabelCheckbox
                                labelText={`${translate(
                                    'dashboard.filters.withCrispr'
                                )}`}
                                backgroundColor="success.dark"
                            />
                        }
                        control={
                            <Checkbox
                                checked={crisprStatus.includes(WITH_CRISPR)}
                                onChange={() =>
                                    dispatch(setCrisprStatus(WITH_CRISPR))
                                }
                            />
                        }
                    />
                    <FormControlLabel
                        label={
                            <LabelCheckbox
                                labelText={`${translate(
                                    'dashboard.filters.noCrispr'
                                )}`}
                                backgroundColor="error.dark"
                            />
                        }
                        control={
                            <Checkbox
                                checked={crisprStatus.includes(NO_CRISPR)}
                                onChange={() =>
                                    dispatch(setCrisprStatus(NO_CRISPR))
                                }
                            />
                        }
                    />
                </Stack>
            </MenuPopover>
        </>
    )
}

export default CrisprStatusPopover
