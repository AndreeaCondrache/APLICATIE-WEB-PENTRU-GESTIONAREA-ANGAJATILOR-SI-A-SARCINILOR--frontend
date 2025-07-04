# Aplicație Web pentru Gestionarea Angajaților și a Sarcinilor

Această aplicație web permite gestionarea angajaților dintr-o companie, împreună cu sarcinile care le sunt atribuite. Proiectul este împărțit în două componente:

- **Frontend**: Angular
- **Backend**: Spring Boot

## 🔧 Funcționalități principale

### 👩‍💼 Pentru Administrator:
- Adăugare, editare și ștergere angajați
- Atribuire de sarcini
- Vizualizare statistici generale
- Răspuns automatizat la întrebări prin chatbot

### 👨‍💻 Pentru Angajat:
- Vizualizare sarcini proprii
- Marcarea sarcinilor ca fiind finalizate
- Vizualizare progres personal

## 🧱 Tehnologii utilizate

### Frontend
- Angular 16+
- TypeScript
- HTML, SCSS
- Angular Material (interfață)

### Backend
- Spring Boot
- Java
- Spring Security (autentificare)
- MySQL (bază de date)

## 🧪 Autentificare
Aplicația include un mecanism de login:
- Autentificare JWT pentru sesiuni sigure
- Roluri: Admin și Angajat
- Protejarea resurselor în funcție de rol

## 🔌 Conectare între frontend și backend
- Comunicarea se face prin API REST (HTTP)
- Frontend-ul trimite cereri către backend prin `HttpClient`

## 🧠 Chatbot
- Implementat în backend
- Răspunde la întrebări despre starea angajaților sau sarcini
- Util pentru administrator în zona de dashboard



