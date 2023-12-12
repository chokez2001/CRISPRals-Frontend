import React, { useState, useEffect } from 'react'
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
} from '@mui/x-data-grid'
import { Box, Button } from '@mui/material'

interface TableRowData {
    [key: string]: string | number
}

interface TableProps {
    jsArray: string
    zipArray: string
}

const JsonTable: React.FC<TableProps> = ({ jsArray, zipArray }) => {
    const [data, setData] = useState<TableRowData[]>([])
    const [showDownloadButton, setShowDownloadButton] = useState(false)

    useEffect(() => {
        try {
            const parsedData = JSON.parse(jsArray)
            const dataWithIds = parsedData.map(
                (row: TableRowData, index: number) => ({
                    ...row,
                    id: index + 1,
                })
            )

            setData(dataWithIds)
        } catch (error) {
            console.error('Error al analizar los datos JSON:', error)
        }
    }, [jsArray])

    useEffect(() => {
        if (zipArray) {
            const array = JSON.parse(zipArray)
            setShowDownloadButton(array?.length > 0)
        }
    }, [zipArray])

    const decodeBase64ToZip = (base64String: string, fileName: string) => {
        try {
            const byteCharacters = atob(base64String)
            const byteNumbers = new Array(byteCharacters.length)

            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i)
            }

            const byteArray = new Uint8Array(byteNumbers)
            const blob = new Blob([byteArray], { type: 'application/zip' })

            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${fileName}.zip`
            a.click()
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error decoding or saving the .zip file:', error)
        }
    }

    const decodeZipInArray = () => {
        if (zipArray) {
            const array = JSON.parse(zipArray)

            array.forEach((item: any) => {
                const zipBase64 = item.Zip
                const sequence = item.Sequence

                decodeBase64ToZip(zipBase64, sequence)
            })
        }
    }

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
                {showDownloadButton && (
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={decodeZipInArray}
                    >
                        Download the complete results
                    </Button>
                )}
            </GridToolbarContainer>
        )
    }

    return (
        <Box>
            <DataGrid
                rows={data}
                columns={
                    data && data.length > 0
                        ? Object.keys(data[0])
                              .filter((item) => item !== 'id')
                              .map((item) => ({
                                  field: item,
                                  headerName: item,
                                  flex: 1,
                              }))
                        : []
                }
                getRowId={(row: TableRowData) => row['id']}
                components={{
                    Toolbar: CustomToolbar,
                }}
            />
        </Box>
    )
}

export default JsonTable
