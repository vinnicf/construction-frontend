import React, { useState, useEffect } from 'react';
import '../../styles/totals.css'
import Decimal from 'decimal.js';

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
                const product = new Decimal(item.unitCost).times(item.quantity).toDecimalPlaces(2, Decimal.ROUND_DOWN);
                return new Decimal(sum).plus(product);
            }
            return new Decimal(sum);
        }, new Decimal(0));


        const computedTotal = items.reduce((sum, item) => {
            if (item.type === 'subitem') {
                if (typeof item.costWithBDI !== 'number' || typeof item.quantity !== 'number') {
                    console.warn('Invalid types for unitCost or quantity');
                    return new Decimal(sum);
                }
                const product = new Decimal(item.costWithBDI || 0).times(item.quantity).toDecimalPlaces(2, Decimal.ROUND_DOWN);
                return new Decimal(sum).plus(product);
            }
            return new Decimal(sum);
        }, new Decimal(0));


        const computedTotalBDI = computedTotal.minus(computedTotalWithoutBDI);

        setTotalWithoutBDI(computedTotalWithoutBDI.toNumber());
        setTotalBDI(computedTotalBDI.toNumber());
        setGrandTotal(computedTotal.toNumber());
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
