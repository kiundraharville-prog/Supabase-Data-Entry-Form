// ✅ Replace these with your Supabase project values
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY"; // (aka anon/publishable key)

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("leadForm");
const emailEl = document.getElementById("email");
const interestEl = document.getElementById("interest");
const msgEl = document.getElementById("message");
const btn = document.getElementById("submitBtn");

function showMessage(text, type = "success") {
  msgEl.innerHTML = `<div class="alert alert-${type} mb-0">${text}</div>`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  btn.disabled = true;
  msgEl.textContent = "";

  const email = emailEl.value.trim();
  const interest_message = interestEl.value.trim();

  try {
    const { error } = await client
      .from("leads")
      .insert([{ email, interest_message }]);

    if (error) throw error;

    showMessage("✅ Saved! Thanks — we got your info.");
    form.reset();
  } catch (err) {
    showMessage(`❌ Couldn’t save: ${err.message}`, "danger");
    console.error(err);
  } finally {
    btn.disabled = false;
  }
});
