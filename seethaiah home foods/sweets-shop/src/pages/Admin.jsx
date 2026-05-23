import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { Save, Download, Upload, Eye, EyeOff, Edit2, Check, X } from 'lucide-react';

const Admin = () => {
    const { products, updateProduct, toggleStock, exportToCSV, resetToDefaults } = useProducts();
    const [editingId, setEditingId] = useState(null);
    const [tempPrice, setTempPrice] = useState("");

    const handleEditPrice = (id, currentPrice) => {
        setEditingId(id);
        setTempPrice(currentPrice.toString());
    };

    const savePrice = (id) => {
        updateProduct(id, { price: parseInt(tempPrice) });
        setEditingId(null);
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all products to their default code values? This will undo all price and stock changes made in this dashboard.")) {
            resetToDefaults();
        }
    };

    return (
        <div className="container" style={{paddingTop: '6rem', paddingBottom: '6rem'}}>
            <div className="section-header" style={{textAlign: 'left', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <div>
                    <h1 className="serif" style={{fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem'}}>Inventory Management</h1>
                    <p style={{color: 'var(--text-muted)'}}>Manage your sweets, update prices, and control stock availability.</p>
                </div>
                <div style={{display: 'flex', gap: '1rem'}}>
                    <button 
                        className="btn btn-outline" 
                        onClick={handleReset}
                        style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#c62828', borderColor: '#c62828'}}
                    >
                        <X size={18} /> Reset to Defaults
                    </button>
                    <button 
                        className="btn btn-outline" 
                        onClick={exportToCSV}
                        style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', borderColor: 'var(--primary)'}}
                    >
                        <Download size={18} /> Export to Excel (CSV)
                    </button>
                </div>
            </div>

            <div className="product-card" style={{padding: '0', overflow: 'hidden', border: '1px solid #eee'}}>
                <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
                    <thead style={{background: 'var(--bg-cream)', borderBottom: '2px solid #eee'}}>
                        <tr>
                            <th style={{padding: '1.5rem', color: 'var(--primary)', fontWeight: '700'}}>Sweet Name</th>
                            <th style={{padding: '1.5rem', color: 'var(--primary)', fontWeight: '700'}}>Category</th>
                            <th style={{padding: '1.5rem', color: 'var(--primary)', fontWeight: '700'}}>Price (500g)</th>
                            <th style={{padding: '1.5rem', color: 'var(--primary)', fontWeight: '700'}}>Status</th>
                            <th style={{padding: '1.5rem', color: 'var(--primary)', fontWeight: '700'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} style={{borderBottom: '1px solid #eee', transition: 'background 0.2s'}}>
                                <td style={{padding: '1.2rem 1.5rem'}}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                        <img src={product.image} alt={product.name} style={{width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover'}} />
                                        <span style={{fontWeight: '600'}}>{product.name}</span>
                                    </div>
                                </td>
                                <td style={{padding: '1.2rem 1.5rem'}}>
                                    <span style={{fontSize: '0.8rem', background: '#f0f0f0', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase'}}>{product.category}</span>
                                </td>
                                <td style={{padding: '1.2rem 1.5rem'}}>
                                    {editingId === product.id ? (
                                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                            <span style={{fontWeight: '600'}}>₹</span>
                                            <input 
                                                type="number" 
                                                value={tempPrice}
                                                onChange={(e) => setTempPrice(e.target.value)}
                                                style={{width: '80px', padding: '5px', borderRadius: '4px', border: '1px solid var(--primary)', outline: 'none'}}
                                            />
                                            <button onClick={() => savePrice(product.id)} style={{color: 'green', border: 'none', background: 'none', cursor: 'pointer'}}><Check size={18}/></button>
                                            <button onClick={() => setEditingId(null)} style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer'}}><X size={18}/></button>
                                        </div>
                                    ) : (
                                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                            <span style={{fontWeight: '600'}}>₹{product.price}</span>
                                            <button 
                                                onClick={() => handleEditPrice(product.id, product.price)}
                                                style={{color: 'var(--text-muted)', border: 'none', background: 'none', cursor: 'pointer', padding: '4px'}}
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td style={{padding: '1.2rem 1.5rem'}}>
                                    <div style={{
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '6px', 
                                        padding: '4px 12px', 
                                        borderRadius: 'var(--radius-full)',
                                        background: product.inStock ? '#e8f5e9' : '#ffebee',
                                        color: product.inStock ? '#2e7d32' : '#c62828',
                                        fontSize: '0.8rem',
                                        fontWeight: '600'
                                    }}>
                                        {product.inStock ? 'In Stock' : 'Sold Out'}
                                    </div>
                                </td>
                                <td style={{padding: '1.2rem 1.5rem'}}>
                                    <button 
                                        onClick={() => toggleStock(product.id)}
                                        className="btn"
                                        style={{
                                            padding: '8px 15px', 
                                            fontSize: '0.8rem',
                                            background: product.inStock ? '#f5f5f5' : 'var(--primary)',
                                            color: product.inStock ? 'var(--text-dark)' : 'white',
                                            border: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}
                                    >
                                        {product.inStock ? <EyeOff size={14}/> : <Eye size={14}/>}
                                        {product.inStock ? 'Mark Sold Out' : 'Mark Available'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
