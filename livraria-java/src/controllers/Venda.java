package models;

import java.util.ArrayList;
import java.util.List;

public class Venda {
    private List<Livro> livros;
    private static int numVendas;
    private int numero = numVendas;
    private String cliente;
    private float valor;

    public Venda(List<Livro> livros, int numero, String cliente, float valor) {
        this.livros = new ArrayList<Livro>();
        this.numero = numero;
        this.cliente = cliente;
        this.valor = valor;
    }

    public void addLivro(Livro l, int index) {
        livros.add(index, l);
    }

    public void listarLivros() {
        System.out.println("-----LIVROS DA VENDA-----");
        int[] count = {1};
        livros.forEach(livro -> System.out.printf("%d. %s\n", count[0]++, livro));
    }

    public List<Livro> getLivros() {
        return livros;
    }

    public void setLivros(List<Livro> livros) {
        this.livros = livros;
    }

    public static int getNumVendas() {
        return numVendas;
    }

    public static void setNumVendas(int numVendas) {
        Venda.numVendas = numVendas;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public float getValor() {
        return valor;
    }

    public void setValor(float valor) {
        this.valor = valor;
    }
}
