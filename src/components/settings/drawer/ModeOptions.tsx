// @mui
import { RadioGroup } from '@mui/material'
import Iconify from '../../iconify'
//
import { useSettingsContext } from '../SettingsContext'
import { StyledCard, StyledWrap, MaskControl } from '../styles'

// ----------------------------------------------------------------------

const OPTIONS = ['light', 'dark'] as const

export default function ModeOptions() {
    const { themeMode, onChangeMode } = useSettingsContext()

    return (
        <RadioGroup name="themeMode" value={themeMode} onChange={onChangeMode}>
            <StyledWrap>
                {OPTIONS.map((mode) => (
                    <StyledCard key={mode} selected={themeMode === mode}>
                        <Iconify
                            icon={`${
                                mode === 'light'
                                    ? 'ri:sun-line'
                                    : 'mdi:weather-night'
                            }`}
                            width={24}
                        />
                        <MaskControl value={mode} />
                    </StyledCard>
                ))}
            </StyledWrap>
        </RadioGroup>
    )
}
