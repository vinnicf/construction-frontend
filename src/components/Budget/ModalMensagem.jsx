import React, { useState } from 'react';
import Modal from './Modal';


const ModalMensagem = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Orcamentor">
            <div className="modal-body">
                <h5>Bem-vindo ao Orcamentor!</h5>
                <p>
                    O uso do aplicativo é intuitivo. Dúvidas podem ser tiradas no e-mail listado abaixo.
                </p>

                <p className="alert alert-danger">
                    Importante: Por enquanto, o estado e o desonerado <strong>não podem ser alterados</strong> para um orçamento já existente.
                </p>
                <p>
                </p><br />
                <hr />
                <p className="text-muted">
                    Sua opinião é muito importante para nós! Por favor, envie sugestões, críticas, e relatos de erros para:
                    <a href="mailto:orcamentorapp@gmail.com">orcamentorapp@gmail.com</a>.
                </p>
            </div>
        </Modal >
    );
};


export default ModalMensagem;