const output = document.getElementById('output');
const input = document.getElementById('cmd-input');

const commands = {
    'whoami': 'Alexis Schwaederle',
    'skills': () => {
        const skillsText = `

- Notions de Programmations

- Connaissances Hardware/Software

- Connaissances reseaux

- Linux`;
        const div = document.createElement('div');
        output.appendChild(div);
        
        let i = 0;
        function typeWriter() {
            if (i < skillsText.length) {
                div.textContent += skillsText.charAt(i);
                i++;
                setTimeout(typeWriter, 20); // ← VITESSE NORMALE
            }
            output.scrollTop = output.scrollHeight;
        }
        typeWriter();
    },
    'experience': `<br> 08/2020 | Agent d'entretien de la propreté urbaine | 1 mois | Mairie de Morlaix<br>
07/2021 | Agent d'entretien des espaces verts | 1 mois | Mairie de Morlaix <br>
08/2021 | Agent d'entretien de la propreté urbaine | 1 mois | Mairie de Morlaix <br>
05/2022 | Ouvrier de démolition | 3 mois | Lavigne Démolition <br>
05/2023 | Manutentionnaire | 8 mois | Menuiserie Thépaut-Colin <br>
01/2026 | Stage | 2 semaines | ULAMIR-CPIE La Capsule <br>
Actuellement | Agent de maintenance et reconditionnement informatique | ... | ULAMIR-CPIE La Capsule`,
    'projects': `<br><a class="git-link" href="https://github.com/M41z0" target="_blank">github.com/M41z0</a> `,
    'contact': '<br><a class="mail-link" href="mailto:schwaederle@protonmail.com">schwaederle@protonmail.com</a> <br><br> 06.09.45.48.84 ',
    'cv': () => {
        const a = document.createElement('a');
        a.href = 'cv.pdf';
        a.download = 'CV-Alexis-Schwaederle.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        output.innerHTML += `<div>Téléchargement du CV lancé...</div>`;
    },
    'help': 'whoami | skills | experience | projects | contact | clear | cv',
    'clear': () => output.innerHTML = ''
};

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const cmd = this.value.trim();
        if (cmd) {
            printCommand(cmd);
            executeCommand(cmd);
        }
        this.value = '';
    }
});

function printCommand(cmd) {
    output.innerHTML += `<div><span class="prompt-text">guest@cv:~$</span> <span class="cmd-user-text">${cmd}</span></div>`;
}

function executeCommand(cmd) {
    const result = commands[cmd.toLowerCase()] || 'Commande inconnue. Tapez "help"';
    
    if (typeof result === 'function') {
        result();
    } else {
        output.innerHTML += `<div>${result}</div>`;
    }
    
    output.scrollTop = output.scrollHeight;
}

// INITIALISATION + CROIX ROUGE
window.addEventListener('DOMContentLoaded', () => {
    printCommand('help');
    executeCommand('help');
    input.focus();
    
    // CROIX ROUGE FONCTIONNELLE
    const closeButton = document.querySelector('.icon:nth-child(3)');
    closeButton.addEventListener('click', () => {
        output.innerHTML += '<div><span class="prompt-text">guest@cv:~$</span> <span class="cmd-user-text">exit</span></div>';
        output.innerHTML += '<div>Connection closed.</div>';
        setTimeout(() => {
            window.close();
        }, 1000);
    });
});