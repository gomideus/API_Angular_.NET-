using System;
using Microsoft.AspNetCore.Authentication;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using System.Text.Encodings.Web;
using System.Net.Http.Headers;
using System.Text;
using System.Security.Claims;
using Microsoft.VisualBasic;

namespace WEBAPI.BasicAuthentication
{
    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        
        public const string DEFAULT_USERNAME = "admin";
        public const string DEFAULT_PASS = "admin";

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
            Console.WriteLine("Basic Auth started...");

            if(!Request.Headers.ContainsKey("Authorization")){
                Console.WriteLine("Authorization header not found !");
                return AuthenticateResult.Fail("Authorization header not found");
            }

            var authenticationHeaderValue = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
            var bytes = Convert.FromBase64String(authenticationHeaderValue.Parameter);
            string[] credentials = Encoding.UTF8.GetString(bytes).Split(":");
            string username = credentials[0];
            string password = credentials[1];
            
            if( username == DEFAULT_USERNAME && password == DEFAULT_PASS ){
                var claims = new[] { new Claim(ClaimTypes.Name, username) };
                var identity = new ClaimsIdentity(claims, Scheme.Name);
                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, Scheme.Name);
                Console.WriteLine("Success!");
                return AuthenticateResult.Success(ticket);
            }

            Console.WriteLine("Authorization failed");
            return AuthenticateResult.Fail("Auth fail");

        }
    }
}
