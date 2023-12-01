import React from 'react';
import BDIChangeModal from './BDIChangeModal';
import '../../styles/topcontainer.css'
import SpreadsheetIcon from '../../assets/spreadsheet.svg'
import EditIcon from '../../assets/edit.svg'
import Carrinho from '../../assets/carrinho.svg'
import Parafusos from '../../assets/parafusos.svg'
import Etapas from '../../assets/etapas.svg'

const desoneradoMapping = {
    'desonerado': 'Desonerado',
    'nao_desonerado': 'Não Desonerado'
};

function formatDatasinapi(datasinapi) {
    const year = datasinapi.substring(0, 4);
    const month = datasinapi.substring(4, 6);
    return `${month}/${year}`;
}

function TopContainer(props) {
    const {
        handleOpenAddStageModal,
        handleOpenAddInsumoModal,
        handleOpenNewBudgetModal,
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
            <div className="row">
                <div className="col-md-5">
                    <div className="buttons-container">
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
                        onBDIChange={handleBDIChange}
                        isOpen={isBDIModalOpen}
                        onClose={() => setBDIModalOpen(false)}
                    />
                </div>
                <div className="col-md-3">
                    <div className="menu-btn-container mb-3">
                        <button id="excel-btn" className="btn mb-2 mr-2 btn-outline-success" onClick={() => exportToExcel(appData.items, appData.BDI, appData.name, appData.desonerado)}><span className="btn-icon"><img src={SpreadsheetIcon} alt="" /></span> Exportar para Excel</button>
                        <button id="bdi-btn" className="btn btn-outline-warning" onClick={() => setBDIModalOpen(true)}><span className="btn-icon"><img src={EditIcon} alt="" /></span> Editar BDI</button>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="dados-container my-2 bg-white p-3 rounded shadow-sm" >
                        <div className="flex-container">
                            <div className="flex-row">
                                <div className="flex-cell bg-light" style={{ width: '50%' }}>Banco de Dados</div>
                                <div className="flex-cell"><b>{formatDatasinapi(appData.datasinapi)} - {appData.state}</b></div>
                            </div>
                            <div className="flex-row">
                                <div className="flex-cell bg-light" style={{ width: '50%' }}>BDI</div>
                                <div className="flex-cell"><b>{appData.BDI * 100}%</b></div>
                            </div>
                            <div className="flex-row">
                                <div className="flex-cell bg-light">Encargos Sociais</div>
                                <div className="flex-cell">
                                    <p><b>{desoneradoMapping[appData.desonerado]}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopContainer;