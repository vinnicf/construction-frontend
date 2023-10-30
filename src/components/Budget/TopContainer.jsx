import React from 'react';
import BDIChangeModal from './BDIChangeModal';

function TopContainer(props) {
    const {
        handleOpenAddStageModal,
        setSearchModalOpen,
        exportToExcel,
        appData,
        setBDIModalOpen,
        isBDIModalOpen,
        handleBDIChange,
        handleDesoneradoChange
    } = props;

    return (

        <div className="topcontainer">
            <div className="buttons-container">
                <div className="add-btn-container">
                    <button className="btn btn-primary " onClick={handleOpenAddStageModal}><span className="icon">+</span>Adicionar Etapa</button>
                    <button className="btn btn-danger mb-2 mr-2" onClick={() => setSearchModalOpen(true)}>Adicionar Composição</button>
                    <button className="btn btn-secondary">Add Insumo</button>
                </div>
                <div className="edit-btn-container">
                    <button className="btn mb-2 mr-2 btn-success" onClick={() => exportToExcel(appData.items, appData.BDI, appData.name, appData.desonerado)}>Exportar para Excel</button>
                    <button className="btn btn-warning" onClick={() => setBDIModalOpen(true)}>Editar BDI</button>
                    <button className="btn btn-dark">Limpar Orçamento e Criar Novo</button>
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

            <div className="dados-container my-2" style={{ margin: '10px' }}>
                <div className="flex-container">
                    <div className="flex-row">
                        <div className="flex-cell bg-light" style={{ width: '50%' }}>Banco de Dados</div>
                        <div className="flex-cell">SINAPI 08/2023 - RIO GRANDE DO SUL</div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-cell bg-light" style={{ width: '50%' }}>BDI</div>
                        <div className="flex-cell">{appData.BDI * 100}%</div>
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