import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualitza l'estat perquè la següent renderització mostri l'UI de fallada.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Pots enviar els errors a un servei de registre d'errors aquí, si ho desitges.
    console.log("Error capturat: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Pots personalitzar el missatge o proporcionar una UI alternativa.
      return <h1>Alguna cosa ha anat malament.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
