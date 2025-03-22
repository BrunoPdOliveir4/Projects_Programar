package models;

public class Impresso extends Livro {
    private float frete;
    private int estoque;

    public Impresso(String titulo, String autores, String editora, float preco, float frete, int estoque) {
        super(titulo, autores, editora, preco);
        this.frete = frete;
        this.estoque = estoque;
    }

    public void atualizarEstoque() {
        if ((this.estoque - 1) < 0) {
            System.out.println("O estoque está vazio, não é possível diminuir mais!");
        }else {
            this.estoque -= 1;
            System.out.println("O estoque foi atualizado, o valor atual é: " + this.estoque);
        }
    }

    @Override
    public String toString() {
        return "Impresso [frete=" + frete + ", estoque=" + estoque + "]";
    }

    public float getFrete() {
        return frete;
    }

    public void setFrete(float frete) {
        this.frete = frete;
    }

    public int getEstoque() {
        return estoque;
    }

    public void setEstoque(int estoque) {
        this.estoque = estoque;
    }
}
