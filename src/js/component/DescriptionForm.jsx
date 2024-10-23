import React, { useState } from "react";



const DescriptionForm = () => {
    const [name, setName] = useState('');
    const [companyIndustry, setCompanyIndustry] = useState('');
    const [companyStyle, setCompanyStyle] = useState('');
    const [logoDescription, setLogoDescription] = useState('');
    const [logoImageUrl, setLogoImageUrl] = useState(''); // Para almacenar la URL de la imagen generada

    const handleGenerateLogo = async ({ companyName, industry, style }) => {
        const prompt = `Create a detailed description about a logotip of a company named ${companyName}, that works in the inudstry ${industry}. The logotip should have a style ${style}`;
        try {
            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer sk - proj - fBfS5otJD0uuptPAci9lyADlrP3ADLp7HVZxmNFMv_8odLPQ8fUhXE6GETXKRtKaMkHE8l6PmQT3BlbkFJiGoqBIPWxYYzT1vWP6SIo3R - Mxwte - dv4Q6RQZyzvh - tZO3O0SliGHgucKUWdgSJffReUIz1oA`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    n: 1, // Número de imágenes a generar
                    size: '1024x1024', // Tamaño de la imagen (puedes ajustarlo)
                }),
            });
            const data = await response.json();
            const imageUrl = data.data[0].url;  // Obtiene la URL de la imagen generada
            setLogoImageUrl(imageUrl);  // Guarda la URL de la imagen en el estado
            const description = data.choices[0].text.trim();
            setLogoDescription(description);

        } catch (error) {
            console.error("An error occurred when trying to generate your company logotip:", error)

        }
    }

    return (
        <div className="form-wrapper mt-5">
            <div className="mb-3 w-50">
                <label className="form-label">Company name</label>
                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div className="mb-3 w-50">
                <label className="form-label">Company Industry</label>
                <input type="text" className="form-control" onChange={(e) => setCompanyIndustry(e.target.value)} value={companyIndustry} />
            </div>
            <div className="mb-3 w-50">
                <label className="form-label">Company colors</label>
                <input type="text" className="form-control" onChange={(e) => setCompanyStyle(e.target.value)} value={companyStyle} />
            </div>
            <div>
                <button className="btn btn-primary mb-3" onClick={handleGenerateLogo}>
                    Generate Logo
                </button>
            </div>
            {logoDescription && (
                <div className="mt-3">
                    <h4>Generated Logo Description:</h4>
                    <p>{logoDescription}</p>
                </div>
            )}
            {/* Mostrar la URL de la imagen generada */}
            {logoImageUrl && (
                <div className="mt-3">
                    <h4>Generated Logo:</h4>
                    <img src={logoImageUrl} alt="Generated Logo" style={{ width: '300px', height: '300px' }} />
                </div>
            )}
        </div>
    );
}

export default DescriptionForm;