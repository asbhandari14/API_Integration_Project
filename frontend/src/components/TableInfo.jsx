import React, { useEffect, useState } from 'react'





const TableInfo = ({ apiData }) => {
    const [keyArray, setKeyArray] = useState([]);


    const SetData = () => {
        if (apiData.length > 0) {
            setKeyArray([...Object.keys(apiData[0])]);
        }
    }

    useEffect(() => {
        SetData();
    }, [apiData])


    return (
        <>
            {apiData.length > 0 && keyArray.length > 0 && <div className="tableInfo w-[90%] flex justify-center items-center mx-auto py-20">
                <table className="table table-striped-columns">
                    <thead>
                        <tr>
                            {
                                keyArray?.map((currElem, index) => {
                                    return (
                                        <th key={index} scope="col">{currElem}</th>
                                    )
                                })
                            }
                        </tr>

                    </thead>
                    <tbody>
                        {apiData.length > 0 ? (
                            apiData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {keyArray.map((header, colIndex) => (
                                        <td className='text-xs' key={colIndex}>{row[header]}</td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={headers.length || 1} className="text-center">
                                    No data available
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>}
        </>
    )
}

export default TableInfo
