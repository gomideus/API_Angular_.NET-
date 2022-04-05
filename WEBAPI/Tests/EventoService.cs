
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WEBAPI.Models
{
    public class EventoService : IEventoService
    {
        private readonly IEventoRepository _eventoRepo;
        public EventoService(IEventoRepository eventoRepo){
            _eventoRepo = eventoRepo;
        }

        public void processarFila(){
            Console.WriteLine("Obtendo a lista: ");
            var lista = _eventoRepo.listar();
            foreach(var item in lista){
                Console.WriteLine("Novo evento:" + item.name.ToString());
            }
            //Console.WriteLine("Pressione uma tecla para finalizar!");
            //Console.ReadKey();
        }

        public void gerarDadosTeste()
        {
            var evento = new Usuario(){
                userID = 1,
                name = "Teste",
                cpf = "123.132.133-09",
                email = "teste@gmail.com",
                userType = "Normal"
            };
            _eventoRepo.incluir(evento);
        }
    }
}