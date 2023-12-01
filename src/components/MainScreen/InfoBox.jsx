const InfoBox = () => {
  return (
    <div className="card my-4 mx-auto" style={{ maxWidth: '800px' }}>
      <div className="card-body">
        <h5 className="card-title">Bem-Vindo ao orcamentor</h5>
        <p className="card-text">
          <strong>Estamos em desenvolvimento:</strong> Este aplicativo ainda está em fase de desenvolvimento ativo. Agradecemos sua paciência e compreensão durante este período.
        </p>
        <p className="card-text">
          <em>Seu feedback é muito importante!</em> Se tiver sugestões ou encontrar algum problema, por favor, nos informe pelo e-mail: <a href="mailto:orcamentorapp@gmail.com">orcamentorapp@gmail.com</a>.
        </p>
        <p className="card-text">
          <strong>Funcionalidades em desenvolvimento:</strong>
        </p>
        <ul className="list-unstyled pl-4">

          <li>Criação de composições personalizadas pelo usuário.</li>
          <li>Troca de desonerado para não desonerado para orçamento existente.</li>
          <li>Seleção do mês da base de dados SINAPI.</li>
          <li>E muito mais...</li>
        </ul>
      </div>
    </div>
  );
};

export default InfoBox;
