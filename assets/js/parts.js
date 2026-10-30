// Turns the status column of the parts list into dropdowns.
// Changes are saved in this browser only (localStorage).
(function () {
  var KEY = 'letitrip-parts-status';
  var OPTIONS = [
    ['have', 'have'],
    ['ordered', 'ordered'],
    ['expected', 'expected'],
    ['check first', 'check first'],
    ['buy', 'buy'],
    ['later', 'later']
  ];

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function save(saved) {
    try {
      localStorage.setItem(KEY, JSON.stringify(saved));
    } catch (e) {
      // storage blocked: the dropdowns still work until the page is closed
    }
  }

  var saved = load();
  var selects = [];

  document.querySelectorAll('section').forEach(function (section) {
    var headers = Array.prototype.map.call(section.querySelectorAll('th'), function (th) {
      return th.textContent.trim();
    });
    var column = headers.indexOf('Status');
    if (column < 0) return;

    section.querySelectorAll('tbody tr').forEach(function (row) {
      var cell = row.children[column];
      var name = row.children[0].textContent.trim();
      var key = section.getAttribute('aria-labelledby') + '/' + name;
      var original = cell.textContent.trim();

      var select = document.createElement('select');
      select.className = 'status';
      select.setAttribute('aria-label', 'Status of ' + name);
      OPTIONS.forEach(function (option) {
        select.add(new Option(option[1], option[0]));
      });
      select.value = saved[key] || original;
      select.dataset.key = key;
      select.dataset.original = original;
      select.dataset.status = select.value;

      select.addEventListener('change', function () {
        select.dataset.status = select.value;
        if (select.value === original) delete saved[key];
        else saved[key] = select.value;
        save(saved);
        update();
      });

      cell.textContent = '';
      cell.appendChild(select);
      selects.push(select);
    });
  });

  var summary = document.getElementById('parts-summary');
  var reset = document.getElementById('parts-reset');

  function update() {
    var counts = {};
    selects.forEach(function (select) {
      counts[select.value] = (counts[select.value] || 0) + 1;
    });
    summary.textContent = (counts.buy || 0) + ' to buy, ' + (counts.ordered || 0) + ' ordered, ' +
      (counts['check first'] || 0) + ' to check, ' + (counts.have || 0) + ' in hand';
  }

  reset.addEventListener('click', function () {
    selects.forEach(function (select) {
      select.value = select.dataset.original;
      select.dataset.status = select.value;
    });
    saved = {};
    save(saved);
    update();
  });

  document.getElementById('parts-tools').hidden = false;
  update();
})();
