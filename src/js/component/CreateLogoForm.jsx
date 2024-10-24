import { FormData } from "openai/_shims/auto/types";
import React, { useState } from "react";

const CreateLogoForm = () => {
    const [name, setName] = useState('');
    const [colorScheme, setColorScheme] = useState('');
    const [companyStyle, setCompanyStyle] = useState('');
    const [logoDescription, setLogoDescription] = useState('');
    const [error, setError] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('')
        const prompt = `A ${companyStyle} logo for the brand called ${name} and making use of this colors: ${colorScheme}, as scheme colors.`
        const apiKey = "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"
        try {
            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    prompt: prompt,
                    n: 1,
                    size: '1024x1024',
                })

            })


            if (!response.ok) throw new Error('Error while generating the image');
            const data = await response.json();
            console.log(data);
            setImageUrl(data.data[0].url);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError({ error });
        }
    }



    return (
        <div className="form-wrapper mt-5">
            <div className="mb-3 w-50">
                <label className="form-label">Company name</label>
                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div className="mb-3 w-50">
                <label className="form-label">Colors Scheme</label>
                <input type="text" className="form-control" onChange={(e) => setColorScheme(e.target.value)} value={colorScheme} />
            </div>
            <div className="mb-3 w-50">
                <select type="text" className="form-select" onChange={(e) => setCompanyStyle(e.target.value)} value={companyStyle}>
                    <option value="selected">Style</option>
                    <option value="minimalism">Minimalism</option>
                    <option value="modern">Modern</option>
                    <option value="retro">Retro</option>
                    <option value="abstract">Abstract</option>
                </select>
            </div>
            <div>
                <button className="btn btn-primary mb-3" onClick={handleSubmit}>
                    Generate Logo
                </button>
            </div>

            {loading &&
                <div className="container bg-secondary">
                    <h1>Generating your brand logo...</h1>
                </div>
            }
            {error && <div className="container bg-danger">{error}</div>}
            {imageUrl &&
                <figure>
                    <img className="img-fluid" src={imageUrl} alt={`${name} logo`}></img>
                    <figureCapture>`Generated logo for ${name}`</figureCapture>
                </figure>
            }
        </div>
    );
}

export default CreateLogoForm;