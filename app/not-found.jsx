import Icon from "@/components/Icon";
import Link from "next/link";

export const metadata = {
  title: "Página não encontrada"
};

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-card">
        <span className="eyebrow">Erro 404</span>
        <h1>Esta rota não faz parte da solução.</h1>
        <p>
          O endereço pode ter mudado ou o conteúdo não está mais disponível.
        </p>
        <Link className="button button-primary" href="/">
          Voltar ao portfólio
          <Icon name="arrow" size={18} />
        </Link>
      </div>
    </main>
  );
}
