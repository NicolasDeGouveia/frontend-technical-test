function Error({ statusCode }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>
        {statusCode && (
          <p>
            Une erreur s&apos;est produite pendant le chargement de la page.
            Veuillez réessayer ultérieurement.
          </p>
        )}
      </p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
