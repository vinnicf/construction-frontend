import React, { useState } from 'react';
import Modal from './Modal';


const ModalMensagem = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Orcamentor">
            <div className="modal-body">
                <h5>Bem-vindo à versão de teste do Orcamentor!</h5>
                <p>
                    Nesta versão, você pode criar apenas <strong>um orçamento</strong> por vez. Se é a primeira vez que você usa o app, ele carrega um orçamento pequeno de exemplo.
                </p>
                <p>Para iniciar um novo orçamento,
                    escolha o estado e os encargos sociais desonerado ou não. Em seguida, clique no botão <span className="">Limpar Orçamento</span>.
                </p>
                <p className="alert alert-danger">
                    Importante: O estado e o desonerado <strong>não podem ser alterados</strong> para um orçamento já existente.
                </p>
                <p>
                    Os dados do seu orçamento são salvos diretamente no seu navegador, permitindo que você
                    <strong> exporte seu orçamento para Excel</strong> quando desejar.
                </p><br />
                <hr />
                <p className="text-muted">
                    Sua opinião é muito importante para nós! Por favor, envie sugestões, críticas, e relatos de erros para:
                    <a href="mailto:orcamentorapp@gmail.com">orcamentorapp@gmail.com</a>.
                </p>
            </div>
        </Modal>
    );
};


export default ModalMensagem;