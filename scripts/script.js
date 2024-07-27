document.addEventListener('DOMContentLoaded', () => {
  fetch('ids.json')
    .then(response => response.json())
    .then(data => {
      fetchData(data);
    })
    .catch(error => console.error('Erro ao puxar ids:', error));
});

function fetchData(userData) {
  const uids = userData.uids;
  const profileContainer = document.querySelector('.profile-container');

  uids.forEach((uid, index) => {
    const userLink = `https://discord.com/users/${uid}/`;
    const profile = createProfile(index, userLink);
    profileContainer.appendChild(profile);

    setTimeout(() => {
      fetchUser(uid, index);
    }, 1000 * index);
  });
}

function fetchUser(uid, index) {
  fetch(`https://rhxcc.discloud.app/users/${uid}/`)
    .then(response => response.json())
    .then(userData => {
      atualizarProfile(index, userData);
    })
    .catch(error => console.error(error));
}

function atualizarProfile(index, userData) {
  const imgElement = document.getElementById(`avatar${index + 1}`);
  const nameElement = document.getElementById(`name${index + 1}`);
  const tagElement = document.createElement('p');
  const flagsElement = document.getElementById(`flags${index + 1}`);
  const connsElement = document.getElementById(`conns${index + 1}`);

  connsElement.className = (userData.connectedAccounts && userData.connectedAccounts.length > 0)
    ? 'conn-container'
    : 'conn-container no-connections';
  tagElement.className = 'tag';
  tagElement.textContent = `@${userData.user.tag}`;
  imgElement.src = userData.profile.avatarUrl;
  nameElement.textContent = userData.user.globalName || userData.user.username || ' ';

  const flags = {
    ActiveDeveloper: "<img class='flag-icon' title='Desenvolvedor(a) Ativo(a)' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/activedeveloper.svg'>",
    // Add other flags here
  };

  flagsElement.innerHTML = (userData.profile.badgesArray && userData.profile.badgesArray.length > 0)
    ? userData.profile.badgesArray.map((flag) => {
      const flagHtml = flags[flag];
      const titleText = flagHtml.match(/title='(.*?)'/);
      const title = titleText ? titleText[1] : '';
      return `<div class="tooltip" style="white-space: nowrap;">${flagHtml}<span class="tooltiptext">${title}</span></div>`;
    }).join('')
    : `<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/invis.png' alt=' '>`;

  const connections = {
    // Define connection icons and links here
  };

  connsElement.innerHTML = (userData.connectedAccounts && userData.connectedAccounts.length > 0)
    ? userData.connectedAccounts.map((conn) => {
      const lowerCaseType = conn.type.toLowerCase();
      if (lowerCaseType in connections) {
        const connection = connections[lowerCaseType];
        if (connection.off) {
          return `<a title="${conn.name || ''}" class="tooltip">${connection.icon}<span class="tooltiptext">${conn.name || ''}</span></a>`;
        }
        if (connection.user) {
          return `<a href="${connection.link}${conn.name}" target="_blank" class="tooltip">${connection.icon}<span class="tooltiptext">${conn.name || ''}</span></a>`;
        } else {
          return `<a href="${connection.link}${conn.id}" target="_blank" class="tooltip">${connection.icon}<span class="tooltiptext">${conn.name || ''}</span></a>`;
        }
      }
      return '';
    }).join(' ')
    : "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/invis.png' alt=' '>";

  nameElement.appendChild(tagElement);
}

function createProfile(index, userLink) {
  const profile = document.createElement('div');
  profile.className = 'profile';
  const link = document.createElement('a');
  link.href = userLink;
  link.target = "_blank";
  link.title = `Clique para ir para o perfil.`;

  const avatar = document.createElement('img');
  avatar.id = `avatar${index + 1}`;
  avatar.alt = '';

  const nameContainer = document.createElement('div');
  nameContainer.className = 'name-container';

  const nameParagraph = document.createElement('p');
  nameParagraph.id = `name${index + 1}`;
  nameParagraph.textContent = ' ';

  const flagsParagraph = document.createElement('p');
  flagsParagraph.id = `flags${index + 1}`;
  flagsParagraph.innerHTML = ' ';

  const connsParagraph = document.createElement('p');
  connsParagraph.id = `conns${index + 1}`;
  connsParagraph.innerHTML = ' ';

  link.appendChild(avatar);
  nameContainer.appendChild(nameParagraph);
  nameContainer.appendChild(flagsParagraph);
  nameContainer.appendChild(connsParagraph);
  profile.appendChild(link);
  profile.appendChild(nameContainer);

  return profile;
}


function removeOverlay() {
  var overlay = document.querySelector('.black-overlay');
  Musica();
  overlay.style.transition = 'opacity 1s';
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1000);
}

function Musica() {
  const audio = document.getElementById('audio');
  audio.volume = 0.3;
  audio.play();
}

function getKey(e) {
  var n = e.keyCode;
  if (console.log(n), 16 != n && 17 != n || (mode = 2), 1 == mode) {
    if (123 == n)
      return !1
  } else {
    if (73 == n || 74 == n || 85 == n)
      return !1;
    if (123 == n)
      return !1
  }
}

let mode = 1;
document.oncontextmenu = new Function("return false;");
window.onkeydown = getKey;

document.querySelector('.profile-container').onmousemove = e => {
  for (const profile of document.querySelectorAll('.profile')) {
    const rect = profile.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
  }
};


document.addEventListener("DOMContentLoaded", function () {
  var audio = document.getElementById("audio");
  var muteButton = document.getElementById("muteButton");
  var muteIcon = document.getElementById("muteIcon");
  var unmuteIcon = document.getElementById("unmuteIcon");

  if (!audio.muted) {
    muteIcon.style.display = "none";
    unmuteIcon.style.display = "inline-block";
  }

  muteButton.addEventListener("click", function () {
    if (audio.muted) {
      audio.muted = false;
      muteIcon.style.display = "none";
      unmuteIcon.style.display = "inline-block";
    } else {
      audio.muted = true;
      muteIcon.style.display = "inline-block";
      unmuteIcon.style.display = "none";
    }
  });
});


