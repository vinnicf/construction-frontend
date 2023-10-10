import React, { useState, useEffect } from 'react';
import '../../styles/totals.css'

function Totals({ items, BDI }) {
    const [totalWithoutBDI, setTotalWithoutBDI] = useState(0);
    const [totalBDI, setTotalBDI] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        const computedTotalWithoutBDI = items.reduce((sum, item) => {
            if (item.type === 'subitem') {
                if (typeof item.unitCost !== 'number' || typeof item.quantity !== 'number') {
                    console.warn('Invalid types for unitCost or quantity');
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
        <div className="totals-container">
            <div className="totals-maindiv">

                <div className="totals-nobdi">
                    <div>Total sem BDI</div>
                    <div>R$ {totalWithoutBDI.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>


                <div className="total-bdi">
                    <div>Total do BDI</div>
                    <div>R$ {totalBDI.toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>


                <div className="grand-total">
                    <div>Total</div>
                    <div>R$ {grandTotal.toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>

            </div>
        </div>
    );
}

export default Totals;
