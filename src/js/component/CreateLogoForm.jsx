import React, { useState } from "react";

const CreateLogoForm = () => {
    const [name, setName] = useState('');
    const [colorScheme, setColorScheme] = useState('');
    const [companyStyle, setCompanyStyle] = useState('');
    const [logoDescription, setLogoDescription] = useState('');
    const [error, setError] = useState('');
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, colorScheme, companyStyle)

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
                    <option selected>Style</option>
                    <option value="minimalism">Minimalism</option>
                    <option value="modern">Modern</option>
                    <option value="retro">Retro</option>
                    <option value="abstract">Abstract</option>
                </select>
            </div>
            <div>
                <button className="btn btn-primary mb-3">
                    Generate Logo
                </button>
            </div>
        </div>
    );
}

export default CreateLogoForm;