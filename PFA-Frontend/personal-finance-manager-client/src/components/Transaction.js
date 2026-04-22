// src/components/Transaction.js
import { useEffect, useState } from "react";
import UserNav from "./UserNav";
import { getTransactions, createTransaction, deleteTransaction } from "../services/transactionService";
import { getCategory } from "../services/categoryService";

/**
 * Transaction page: list transactions, create new, delete.
 * Texts in Spanish; code and comments in English.
 */
const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        amount: "",
        date: "",
        description: "",
        type: "EXPENSE", // default
        categoryId: "",
        recurrence: "NO" // NO | MONTHLY | YEARLY
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const [txs, cats] = await Promise.all([getTransactions(), getCategory()]);
                setTransactions(txs);
                setCategories(cats);
            } catch (err) {
                console.error(err);
                setError("Error cargando datos. Revisa la consola.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!form.amount || isNaN(Number(form.amount))) {
            setError("Introduce una cantidad válida.");
            return;
        }
        if (!form.date) {
            setError("Selecciona una fecha.");
            return;
        }
        if (!form.categoryId) {
            setError("Selecciona una categoría.");
            return;
        }

        const payload = {
            amount: Number(form.amount),
            date: form.date, // backend expects LocalDate (YYYY-MM-DD)
            description: form.description || null,
            type: form.type, // "INCOME" or "EXPENSE"
            categoryId: Number(form.categoryId),
            recurrence: form.recurrence // "NO" | "MONTHLY" | "YEARLY"
        };

        try {
            setSaving(true);
            const created = await createTransaction(payload);
            setTransactions((prev) => [created, ...prev]);
            // reset form
            setForm({
                amount: "",
                date: "",
                description: "",
                type: "EXPENSE",
                categoryId: "",
                recurrence: "NO"
            });
        } catch (err) {
            console.error(err);
            setError("Error creando la transacción. Revisa la consola.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar esta transacción?")) return;
        try {
            await deleteTransaction(id);
            setTransactions((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            console.error(err);
            setError("Error eliminando la transacción.");
        }
    };

    return (
        <div className="container">
            <UserNav />
            <h2>Transacciones</h2>

            <section className="transaction-section">
                <div className="transaction-form-card">
                    <h3>Crear nueva transacción</h3>

                    {error && <div className="form-error">{error}</div>}

                    <form className="transaction-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label>Tipo</label>
                            <select name="type" value={form.type} onChange={handleChange}>
                                <option value="INCOME">Ingreso</option>
                                <option value="EXPENSE">Gasto</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label>Cantidad</label>
                            <input
                                name="amount"
                                type="number"
                                step="0.01"
                                value={form.amount}
                                onChange={handleChange}
                                placeholder="0.00€"
                            />
                        </div>

                        <div className="form-row">
                            <label>Fecha</label>
                            <input name="date" type="date" value={form.date} onChange={handleChange} />
                        </div>

                        <div className="form-row">
                            <label>Categoría</label>
                            <select name="categoryId" value={form.categoryId} onChange={handleChange}>
                                <option value="">-- Selecciona --</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-row">
                            <label>Recurrencia</label>
                            <select name="recurrence" value={form.recurrence} onChange={handleChange}>
                                <option value="NO">No recurrente</option>
                                <option value="MONTHLY">Mensual</option>
                                <option value="YEARLY">Anual</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label>Descripción</label>
                            <input
                                name="description"
                                type="text"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Descripción (opcional)"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="nav-btn" disabled={saving}>
                                {saving ? "Guardando..." : "Crear transacción"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="transaction-list-card">
                    <h3>Listado de transacciones</h3>

                    {loading && <p>Cargando transacciones...</p>}
                    {!loading && transactions.length === 0 && <p>No hay transacciones registradas.</p>}
                    {!loading && transactions.length > 0 && (
                        <div className={`transaction-list ${transactions.length > 4 ? "scrollable" : ""}`}>
                            {transactions.map((t) => (
                                <div key={t.id} className={`transaction-item ${t.type === "INCOME" ? "income" : "expense"}`}>
                                    <div className="transaction-main">
                                        <div className="transaction-top">
                                            <span className="transaction-amount">{t.amount}€</span>
                                            <span className="transaction-type">{t.type === "INCOME" ? "Ingreso" : "Gasto"}</span>
                                        </div>
                                        <div className="transaction-meta">
                                            <span className="muted">{t.categoryName}</span>
                                            <span className="muted"> · {t.date}</span>
                                            {t.recurrence && t.recurrence !== "NO" && (
                                                <span className="muted"> · {t.recurrence === "MONTHLY" ? "Mensual" : "Anual"}</span>
                                            )}
                                        </div>
                                        {t.description && <div className="transaction-desc">{t.description}</div>}
                                    </div>

                                    <div className="transaction-actions">
                                        <button className="nav-btn secondary" onClick={() => handleDelete(t.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Transaction;
