from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
from webdriver_manager.chrome import ChromeDriverManager


class EditProfileTest:
    def __init__(self):
        # Configuración del WebDriver
        options = Options()
        options.add_argument("--start-maximized")
        self.service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=self.service, options=options)
        self.wait = WebDriverWait(self.driver, 20)

    def login_as_special_user(self):
        try:
            # Accede a la página de inicio de sesión
            self.driver.get("http://localhost:5173/login")  # Ajusta la URL si es necesario

            # Completa las credenciales de inicio de sesión
            username_field = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Ingresa tu nombre de usuario']"))
            )
            password_field = self.driver.find_element(By.XPATH, "//input[@placeholder='Ingresa tu contraseña']")
            login_button = self.driver.find_element(By.XPATH, "//button[contains(text(),'Iniciar Sesión')]")

            username_field.send_keys("special_user")
            password_field.send_keys("special_password")
            login_button.click()

            # Verifica que se redirige a la página de perfil
            self.wait.until(EC.url_contains("/profile"))
            print("Inicio de sesión exitoso como 'special_user'.")

        except TimeoutException:
            print("Error: No se pudo iniciar sesión. Verifica las credenciales.")
        except WebDriverException as e:
            print(f"Error durante el login: {e}")

    def navigate_to_edit_profile(self):
        try:
            # Verifica que estás en la página de perfil
            self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//div[contains(text(),'Barra Lateral')]"))
            )
            print("Página de perfil cargada correctamente.")

            # Busca el botón "Editar Perfil" en la barra lateral
            edit_profile_button = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'Editar Perfil')]"))
            )
            print("Botón 'Editar Perfil' encontrado en la barra lateral.")

            # Haz clic en el botón de Editar Perfil
            self.driver.execute_script("arguments[0].click();", edit_profile_button)
            print("Haciendo clic en el botón de 'Editar Perfil'.")

            # Esperar que la URL cambie a la sección de edición de perfil
            self.wait.until(EC.url_contains("/profile/edit"))
            print("Redirigido exitosamente a la sección de Editar Perfil.")

        except TimeoutException:
            print("Error: No se pudo acceder a la sección de Editar Perfil.")
        except WebDriverException as e:
            print(f"Error al navegar a Editar Perfil: {e}")

    def edit_general_information(self):
        try:
            # Asegurar que la sección "Editar Información General" esté visible
            general_info_section = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//h2[contains(text(),'Editar Información General')]/.."))
            )
            self.driver.execute_script("arguments[0].scrollIntoView(true);", general_info_section)
            print("Sección 'Editar Información General' encontrada.")

            # Interactuar con unos cuantos campos
            country_field = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//input[@placeholder='País']"))
            )
            country_field.clear()
            country_field.send_keys("Colombia")
            print("Campo 'País' actualizado.")

            city_field = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Ciudad']"))
            )
            city_field.clear()
            city_field.send_keys("Bogotá")
            print("Campo 'Ciudad' actualizado.")

        except TimeoutException:
            print("Error: No se pudieron encontrar los campos de Información General.")
        except WebDriverException as e:
            print(f"Error durante la edición de Información General: {e}")

    def edit_skills(self):
        try:
            # Asegurar que la sección "Editar Habilidades" esté visible
            skills_section = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//h2[contains(text(),'Editar Habilidades')]/.."))
            )
            self.driver.execute_script("arguments[0].scrollIntoView(true);", skills_section)
            print("Sección 'Editar Habilidades' encontrada.")

            # Añadir una nueva habilidad personalizada
            custom_skill_field = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Nueva habilidad personalizada']"))
            )
            custom_skill_field.clear()
            custom_skill_field.send_keys("Automated Testing")
            add_custom_skill_button = self.driver.find_element(By.XPATH, "//button[contains(text(),'Añadir')]")
            self.driver.execute_script("arguments[0].click();", add_custom_skill_button)
            print("Habilidad personalizada añadida.")

            # Seleccionar una habilidad preexistente de la lista
            skill_option = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'React.js')]"))
            )
            self.driver.execute_script("arguments[0].click();", skill_option)
            print("Habilidad 'React.js' añadida desde la lista.")

        except TimeoutException:
            print("Error: No se pudieron encontrar los campos de Habilidades.")
        except WebDriverException as e:
            print(f"Error durante la edición de Habilidades: {e}")

    def run(self):
        try:
            self.login_as_special_user()
            self.navigate_to_edit_profile()
            self.edit_general_information()
            self.edit_skills()
        finally:
            self.driver.quit()


# Ejecución del script
if __name__ == "__main__":
    test = EditProfileTest()
    test.run()
