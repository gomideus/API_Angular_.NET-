
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

        public void ProcessarFila(){
            Console.WriteLine("Obtendo a lista: ");
            var lista = _eventoRepo.Listar();
            foreach(var item in lista){
                Console.WriteLine("Novo evento:" + item.name.ToString());
            }
            Console.WriteLine("Pressione uma tecla para finalizar!");
            Console.ReadKey();
        }

        public void GerarDadosTeste()
        {
            var evento = new Usuario(){
                userID = 1,
                name = "Nome Teste",
                cpf = "123.132.133-09",
                email = "test@gmail.com",
                userType = "Admin"
            };
            _eventoRepo.Incluir(evento);
        }
    }
}