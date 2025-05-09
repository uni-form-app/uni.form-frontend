interface CreateProductProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  register: any;
  errors: any;
  imagem: string | null;
  setImagem: (imagem: string | null) => void;
}

export const CreateProduct = ({
  onSubmit,
  register,
  errors,
  imagem,
  setImagem,
}: CreateProductProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input id="nome" {...register("nome")} />
        {errors.nome && <span>{errors.nome.message}</span>}
      </div>

      <div>
        <label htmlFor="preco">Preço:</label>
        <input id="preco" type="number" {...register("preco")} />
        {errors.preco && <span>{errors.preco.message}</span>}
      </div>

      <div>
        <label htmlFor="descricao">Descrição:</label>
        <textarea id="descricao" {...register("descricao")} />
        {errors.descricao && <span>{errors.descricao.message}</span>}
      </div>

      <div>
        <label htmlFor="imagem">Imagem:</label>
        <input
          id="imagem"
          type="file"
          onChange={(e) =>
            setImagem(e.target.files ? e.target.files[0]?.name || null : null)
          }
        />
        {imagem && <p>Imagem selecionada: {imagem}</p>}
      </div>

      <button type="submit">Criar Produto</button>
    </form>
  );
};