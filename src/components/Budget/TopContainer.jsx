import React from 'react';
import BDIChangeModal from './BDIChangeModal';
import AddIcon from '../../assets/plus-circle.svg'
import SpreadsheetIcon from '../../assets/spreadsheet.svg'
import EditIcon from '../../assets/edit.svg'
import TrashIcon from '../../assets/trash.svg'
import Carrinho from '../../assets/carrinho.svg'
import Parafusos from '../../assets/parafusos.svg'
import Etapas from '../../assets/etapas.svg'

function TopContainer(props) {
    const {
        handleOpenAddStageModal,
        handleOpenAddInsumoModal,
        setSearchModalOpen,
        exportToExcel,
        appData,
        setBDIModalOpen,
        isBDIModalOpen,
        handleBDIChange,
        handleDesoneradoChange
    } = props;

    return (

        <div className="topcontainer p-3 rounded">
            <div className="buttons-container">
                <div className="button-deck">
                    <div className="edit-btn-container mb-3">
                        <button className="btn mb-2 mr-2 btn-success" onClick={() => exportToExcel(appData.items, appData.BDI, appData.name, appData.desonerado)}><span className="btn-icon"><img src={SpreadsheetIcon} alt="" /></span> Exportar para Excel</button>
                        <button className="btn btn-warning" onClick={() => setBDIModalOpen(true)}><span className="btn-icon"><img src={EditIcon} alt="" /></span> Editar BDI</button>
                        <button className="btn btn-danger"><span className="btn-icon"><img src={TrashIcon} alt="" /></span>Limpar Orçamento</button>
                    </div>
                </div>
                

                <div className="button-deck">
                    <div className="add-btn-container">
                        <button className="fat-button" onClick={handleOpenAddStageModal}>
                            <span className="add-btn-icon"><img src={Etapas} alt="" /></span>
                            <span className="add-btn-text">Adicionar<br></br> Etapa</span>
                        </button>
                        <button className="fat-button" onClick={() => setSearchModalOpen(true)}>
                            <span className="add-btn-icon"><img src={Carrinho} alt="" /></span>
                            <span className="add-btn-text">Adicionar <br></br>Composição</span>
                        </button>
                        <button className="fat-button" onClick={handleOpenAddInsumoModal}>
                            <span className="add-btn-icon"><img src={Parafusos} alt="" /></span>
                            <span className="add-btn-text">Adicionar<br></br>Insumo</span>
                        </button>
                    </div>
                </div>

                <BDIChangeModal
                    initialBDI={appData.BDI}
                    initialDesonerado={appData.desonerado}
                    onBDIChange={handleBDIChange}
                    onDesoneradoChange={handleDesoneradoChange}
                    isOpen={isBDIModalOpen}
                    onClose={() => setBDIModalOpen(false)}
                />
            </div>

            <div className="dados-container my-2 bg-white p-3 rounded shadow-sm" >
                <div className="flex-container">
                    <div className="flex-row">
                        <div className="flex-cell bg-light" style={{ width: '50%' }}>Banco de Dados</div>
                        <div className="flex-cell"><b>SINAPI 08/2023 - RIO GRANDE DO SUL</b></div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-cell bg-light" style={{ width: '50%' }}>BDI</div>
                        <div className="flex-cell"><b>{appData.BDI * 100}%</b></div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-cell bg-light">Encargos Sociais</div>
                        <div className="flex-cell">
                            <p>Não desonerada</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopContainer;