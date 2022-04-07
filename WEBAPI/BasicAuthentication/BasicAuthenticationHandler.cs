using System;
using Microsoft.AspNetCore.Authentication;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using System.Text.Encodings.Web;
using System.Net.Http.Headers;
using System.Text;
using System.Security.Claims;


namespace WEBAPI.BasicAuthentication
{
    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {

        public BasicAuthenticationHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock)
            : base(options, logger, encoder, clock)
        {

        }

        
        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {

            Console.WriteLine("HERE");
            if(!Request.Headers.ContainsKey("Authorization")){
                Console.WriteLine("HERE-01");
                return AuthenticateResult.Fail("Authorization header not found");
            }

            var authenticationHeaderValue = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
            var bytes = Convert.FromBase64String(authenticationHeaderValue.Parameter);
            string[] credentials = Encoding.UTF8.GetString(bytes).Split(":");
            string username = credentials[0];
            string password = credentials[1];

            Console.WriteLine(username);
            Console.WriteLine(password);
            
            if( username == "admin" && password == "admin" ){
                var claims = new[] { new Claim(ClaimTypes.Name, username) };
                var identity = new ClaimsIdentity(claims, Scheme.Name);
                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, Scheme.Name);
                return AuthenticateResult.Success(ticket);
            }


            return AuthenticateResult.Fail("Auth fail");

        }
    }
}
