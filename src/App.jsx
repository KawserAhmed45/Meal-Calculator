import { useState } from "react";
import "./index.css";

function App() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    meal: "",
    bazar: "",
  });

  const totalMeal = members.reduce((sum, m) => sum + Number(m.meal), 0);
  const totalBazar = members.reduce((sum, m) => sum + Number(m.bazar), 0);
  const mealRate = totalMeal ? totalBazar / totalMeal : 0;

  const addMember = (e) => {
    e.preventDefault();

    if (!form.name.trim() || form.meal === "" || form.bazar === "") return;

    setMembers([
      ...members,
      {
        id: Date.now(),
        name: form.name.trim(),
        meal: Number(form.meal),
        bazar: Number(form.bazar),
      },
    ]);

    setForm({ name: "", meal: "", bazar: "" });
  };

  const removeMember = (id) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const money = (value) =>
    `৳${Number(value).toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <main className="app">
      <div className="container">

        {/* Header */}
        <header className="topbar">
          <div className="brand">
            <div className="brand-icon">🍽</div>

            <div>
              <h1>Meal<span>Mate</span></h1>
              <p>Simple meal & bazar calculator</p>
            </div>
          </div>

          <div className="rate-card">
            <span>Current Meal Rate</span>
            <strong>{money(mealRate)}</strong>
            <small>per meal</small>
          </div>
        </header>

        {/* Summary */}
        <section className="summary-grid">

          <div className="summary-card">
            <div className="summary-icon meal-icon">🍚</div>
            <div>
              <small>Total Meals</small>
              <strong>{totalMeal}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon bazar-icon">🛒</div>
            <div>
              <small>Total Bazar</small>
              <strong>{money(totalBazar)}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon member-icon">👥</div>
            <div>
              <small>Total Members</small>
              <strong>{members.length}</strong>
            </div>
          </div>

        </section>

        {/* Add Member */}
        <section className="add-card">
          <div className="section-heading">
            <div>
              <h2>Add Member</h2>
              <p>Enter meal and bazar information</p>
            </div>
          </div>

          <form onSubmit={addMember} className="member-form">

            <div className="input-group name-input">
              <label>Name</label>
              <input
                type="text"
                placeholder="e.g. Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>Meal</label>
              <input
                type="number"
                min="0"
                step="0.5"
                placeholder="0"
                value={form.meal}
                onChange={(e) =>
                  setForm({ ...form, meal: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>Bazar (৳)</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={form.bazar}
                onChange={(e) =>
                  setForm({ ...form, bazar: e.target.value })
                }
              />
            </div>

            <button className="add-btn" type="submit">
              <span>+</span>
              Add Member
            </button>

          </form>
        </section>

        {/* Members */}
        <section className="members-card">

          <div className="section-heading members-heading">
            <div>
              <h2>Meal Summary</h2>
              <p>Individual meal and bazar calculation</p>
            </div>

            {members.length > 0 && (
              <span className="member-count">
                {members.length} {members.length === 1 ? "Member" : "Members"}
              </span>
            )}
          </div>

          {members.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🍽️</div>
              <h3>No members yet</h3>
              <p>Add your first member to start calculating.</p>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Meal</th>
                    <th>Bazar</th>
                    <th>Meal Cost</th>
                    <th>Balance</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {members.map((member) => {
                    const mealCost = member.meal * mealRate;
                    const balance = member.bazar - mealCost;

                    return (
                      <tr key={member.id}>
                        <td>
                          <div className="member-name">
                            <div className="avatar">
                              {member.name.charAt(0).toUpperCase()}
                            </div>
                            <strong>{member.name}</strong>
                          </div>
                        </td>

                        <td>
                          <span className="meal-value">
                            {member.meal}
                          </span>
                        </td>

                        <td>{money(member.bazar)}</td>

                        <td>{money(mealCost)}</td>

                        <td>
                          <span
                            className={`balance ${
                              balance >= 0 ? "receive" : "pay"
                            }`}
                          >
                            {balance >= 0 ? "Get " : "Pay "}
                            {money(Math.abs(balance))}
                          </span>
                        </td>

                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => removeMember(member.id)}
                            title="Remove"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </section>

        {/* Formula */}
        <div className="formula">
          <span>Meal Rate</span>
          <b>Total Bazar ÷ Total Meal</b>
          <span>=</span>
          <strong>{money(mealRate)}</strong>
        </div>

        <footer>
          MealMate · Simple & smart meal calculation
        </footer>

      </div>
    </main>
  );
}

export default App;