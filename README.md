# Identity Stick Demos
Dies sind die zwei Ansichten, die die Nutzung des Identity Sticks zeigen sollen. Sie zeigen einmal den Use Case "Ausweisen" bzw. "Login".
Um die Nutzung der Hardware zu simulieren, befinden sich zwei Buttons auf der Webseite, die von Nutzenden gedrückt werden können. Es ist eine reine Demonstrationssoftware. Das heißt, dass keine Daten ausgetauscht oder abgespeichert werden. Für einen Protoypen des Protokolls mit Austausch kann der Solo Key mit [diesem Code](https://github.com/Identity-Stick/solo) verwendet werden und [hiermit](https://github.com/Identity-Stick/identity-stick-server) getestet werden. 

# Testen
Um einen der beiden Use Cases zu testen, muss die entsprechende HTML-Datei ("use_case_ausweisen.html" bzw. "use_case_login.html") in einem Browser geöffnet werden.



# Entwicklung
Die Demos wurden mit Reactjs entwickelt. Dazu sollte node und die Packages für den [Babel Precompiler](https://babeljs.io/en/setup/#browser) installiert sein.
Dieser kann mit folgendem Befehl installiert werden:
```bash
npm install @babel/preset-env --save-dev
```
Die entsprechenden Components liegen in den Dateien im Ordner "/src". Sie sollten precompiled im Ordner "/prod" abgelegt werden. Dazu kann folgender Befehl verwendet werden:
```bash
npx babel --watch src --out-dir ./prod --presets react-app/prod
```

# Supported by
The identity stick project is a finalist of the [PrototypeFund round 7](https://prototypefund.de/), see [our project site](https://prototypefund.de/project/identity-stick/) for details.

[<img alt="BMBF" src="https://identity-stick.github.io/ressourcen/BMBF_gefîrdert%20vom_deutsch.jpg" height="150">](https://www.bmbf.de/de/software-sprint-freie-programmierer-unterstuetzen-3512.html "BMBF Software Sprint Förderrichtlinie")
[<img alt="Prototypefund" src="https://i0.wp.com/blog.okfn.org/files/2017/12/22137279_1679687182104997_6759961652435307500_o.jpg" height="150">](https://prototypefund.de "Prototypefund Website")
