from playwright.sync_api import sync_playwright

def verify_security_and_admin():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 1200}) # Taller viewport
        page = context.new_page()

        # 1. Verify Contact Captcha
        print("Checking Contact Page...")
        page.goto("http://localhost:3000/contact")
        page.wait_for_timeout(3000)
        # Scroll to bottom
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.screenshot(path="/home/jules/verification/contact_captcha.png", full_page=True)
        print("Screenshot saved: contact_captcha.png")

        # 2. Login as Admin
        print("Logging in as Admin...")
        page.goto("http://localhost:3000/account")
        page.fill('input[type="email"]', "admin@lestresorsdecaroline.com")
        page.fill('input[type="password"]', "admin")
        page.click('button:has-text("Se connecter")')
        page.wait_for_url("**/admin")

        # 3. Verify Admin Dashboard & File Upload
        print("Checking Admin Dashboard...")
        page.click('button:has-text("Ajouter un produit")')
        page.wait_for_selector('input[type="file"]', state="attached")
        page.wait_for_timeout(1000)
        page.screenshot(path="/home/jules/verification/admin_upload.png", full_page=True)
        print("Screenshot saved: admin_upload.png")

        browser.close()

if __name__ == "__main__":
    verify_security_and_admin()
