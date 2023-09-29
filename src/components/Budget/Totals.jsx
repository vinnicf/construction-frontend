import React, { useState, useEffect } from 'react';

function Totals({ items, BDI }) {
    const [totalWithoutBDI, setTotalWithoutBDI] = useState(0);
    const [totalBDI, setTotalBDI] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        const computedTotalWithoutBDI = items.reduce((sum, item) => {
            if (item.type === 'subitem') {
                if (typeof item.unitCost !== 'number' || typeof item.quantity !== 'number') {
                    console.log("Problematic item without BDI:", item);
                }
                return sum + (item.unitCost * item.quantity);
            }
            return sum;
        }, 0);

        const computedTotalBDI = items.reduce((sum, item) => {
            if (item.type === 'subitem') {
                return sum + (item.unitCost * BDI * item.quantity);
            }
            return sum;
        }, 0);

        setTotalWithoutBDI(computedTotalWithoutBDI);
        setTotalBDI(computedTotalBDI);
        setGrandTotal(computedTotalWithoutBDI + computedTotalBDI);
    }, [items, BDI]);

    return (
        <tfoot>
            <tr>
                <td colSpan="5">Total without BDI</td>
                <td colSpan="2">{totalWithoutBDI.toFixed(2)}</td>
            </tr>
            <tr>
                <td colSpan="5">Total of BDI</td>
                <td colSpan="2">{totalBDI.toFixed(2)}</td>
            </tr>
            <tr>
                <td colSpan="5">Grand Total</td>
                <td colSpan="2">{grandTotal.toFixed(2)}</td>
            </tr>
        </tfoot>
    );
}

export default Totals;
