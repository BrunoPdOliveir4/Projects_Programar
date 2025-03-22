package views;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import models.*;

public class LivrariaVirtual {
    private final int MAX_IMPRESSOS = 10;
    private final int MAX_ELETRONICOS = 20;
    private final int MAX_VENDAS = 20;

    private int numImpressos;
    private int numEletronicos;
    private int numVendas;

    private List<Livro> impressos;
    private List<Livro> eletronicos;
    private List<Venda> vendas;

    private static LivrariaVirtual instance = new LivrariaVirtual();

    public LivrariaVirtual() {
        this.numEletronicos = 0;
        this.numImpressos = 0;
        this.numVendas = 0;
        
        this.impressos = new ArrayList<Livro>();
        this.eletronicos = new ArrayList<Livro>();
        this.vendas = new ArrayList<Venda>();
    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("-----INICIANDO O SISTEMA-----");
        boolean refazer = true;

        while (refazer) {
            System.out.println("1 - Cadastrar Livro");
            System.out.println("2 - Realizar Venda");
            System.out.println("3 - Listar Todos os Livros");
            System.out.println("4 - Listar Todas as Vendas");
            System.out.println("0 - Encerrar o Sistema");
            System.out.print("Sua escolha: ");

            int escolha = scan.nextInt();

            switch (escolha) {
                case 1:
                    cadastrarLivro(scan);
                    break;

                case 2:
                    realizarVenda();
                    break;

                case 3:
                    listarLivros();
                    break;

                case 4:
                    listarVendas();
                    break;

                case 0:
                    System.out.println("-----O SISTEMA SERÁ FINALIZADO-----");
                    System.exit(0);

                default:
                    System.out.println("Opção inválida");
                    break;
            }
        }
    }

    public static void cadastrarLivro(Scanner scan) {
        Livro livro;

        System.out.println("Informe o tipo de livro");
        System.out.println("1 - Impresso\n2 - Eletronico\n3 - Ambos");

        int escolha = scan.nextInt();

        switch (escolha) {
            case 1:
                livro = cadastrarLivroImpresso(scan);
                if (instance.numImpressos < instance.MAX_IMPRESSOS) {
                    instance.impressos.add(livro);
                    instance.numImpressos++;
                    System.out.println("Livro impresso cadastrado com sucesso!");
                } else {
                    System.out.println("Limite de livros impressos atingido!");
                }
                break;
            case 2:
                livro = cadastrarLivroEletronico(scan);
                if (instance.numEletronicos < instance.MAX_ELETRONICOS) {
                    instance.eletronicos.add(livro);
                    instance.numEletronicos++;
                    System.out.println("Livro eletrônico cadastrado com sucesso!");
                } else {
                    System.out.println("Limite de livros eletrônicos atingido!");
                }
                break;
            case 3:
                livro = cadastrarLivroImpresso(scan);
                if (instance.numImpressos < instance.MAX_IMPRESSOS) {
                    instance.impressos.add(livro);
                    instance.numImpressos++;
                }
                livro = cadastrarLivroEletronico(scan);
                if (instance.numEletronicos < instance.MAX_ELETRONICOS) {
                    instance.eletronicos.add(livro);
                    instance.numEletronicos++;
                }
                break;
            default:
                System.out.println("Opção inválida!");
                break;
        }
    }

    public static void realizarVenda() {
        Scanner scan = new Scanner(System.in);
        if (instance.numVendas >= instance.MAX_VENDAS) {
            System.out.println("Limite máximo de vendas atingido!");
            return;
        }
        
        if (instance.numImpressos == 0 && instance.numEletronicos == 0) {
            System.out.println("Não há livros cadastrados para venda!");
            return;
        }

        System.out.println("Digite o nome do cliente:");
        String cliente = scan.nextLine();
        
        List<Livro> livrosVenda = new ArrayList<>();
        float valorTotal = 0;
        
        boolean continuar = true;
        while(continuar) {
            System.out.println("1 - Adicionar livro impresso");
            System.out.println("2 - Adicionar livro eletrônico");
            System.out.println("0 - Finalizar venda");
            
            int escolha = scan.nextInt();
            if (escolha == 0) break;
            
            listarLivros();
            System.out.println("Digite o índice do livro:");
            int indice = scan.nextInt() - 1;
            
            if (escolha == 1 && indice < instance.impressos.size()) {
                Livro livro = instance.impressos.get(indice);
                livrosVenda.add(livro);
                valorTotal += livro.getPreco();
                if (livro instanceof Impresso) {
                    ((Impresso) livro).atualizarEstoque();
                }
            } else if (escolha == 2 && indice < instance.eletronicos.size()) {
                Livro livro = instance.eletronicos.get(indice);
                livrosVenda.add(livro);
                valorTotal += livro.getPreco();
            }
        }
        
        if (livrosVenda.size() > 0) {
            Venda venda = new Venda(livrosVenda, instance.numVendas + 1, cliente, valorTotal);
            instance.vendas.add(venda);
            instance.numVendas++;
            System.out.println("Venda realizada com sucesso! Valor total: R$" + valorTotal);
        }
    }

    public static void listarLivrosImpressos() {
        System.out.println("-----LIVROS IMPRESSOS-----");
        for (int i = 0; i < instance.impressos.size(); i++) {
            System.out.printf("%d. %s\n", i+1, instance.impressos.get(i));
        }
    }

    public static void listarLivrosEletronicos() {
        System.out.println("-----LIVROS ELETRÔNICOS-----");
        for (int i = 0; i < instance.eletronicos.size(); i++) {
            System.out.printf("%d. %s\n", i+1, instance.eletronicos.get(i));
        }
    }

    public static void listarLivros() {
        listarLivrosImpressos();
        listarLivrosEletronicos();
    }

    public static void listarVendas() {
        System.out.println("-----VENDAS REALIZADAS-----");
        for (Venda venda : instance.vendas) {
            System.out.printf("\nVenda #%d - Cliente: %s - Valor: R$%.2f\n", 
                venda.getNumero(), venda.getCliente(), venda.getValor());
            venda.listarLivros();
        }
    }

    //FUNÇÕES AUXILIARES
    public static Impresso cadastrarLivroImpresso(Scanner scan) {
        scan.nextLine(); // Clear buffer
        System.out.println("Digite o título do livro:");
        String titulo = scan.nextLine();
        
        System.out.println("Digite o(s) autor(es) do livro:");
        String autores = scan.nextLine();
        
        System.out.println("Digite a editora do livro:");
        String editora = scan.nextLine();
        
        System.out.println("Digite o preço do livro:");
        float preco = scan.nextFloat();
        
        System.out.println("Digite o valor do frete:");
        float frete = scan.nextFloat();
        
        System.out.println("Digite a quantidade em estoque:");
        int estoque = scan.nextInt();

        return new Impresso(titulo, autores, editora, preco, frete, estoque);
    }

    public static Eletronico cadastrarLivroEletronico(Scanner scan) {
        scan.nextLine(); // Clear buffer
        System.out.println("Digite o título do livro:");
        String titulo = scan.nextLine();
        
        System.out.println("Digite o(s) autor(es) do livro:");
        String autores = scan.nextLine();
        
        System.out.println("Digite a editora do livro:");
        String editora = scan.nextLine();
        
        System.out.println("Digite o preço do livro:");
        float preco = scan.nextFloat();
        
        System.out.println("Digite o tamanho do arquivo:");
        int tamanho = scan.nextInt();

        return new Eletronico(titulo, autores, editora, preco, tamanho);
    }
}
