/* Duara mobile navigation.
 *
 * The header nav is hidden below 768px and there was no menu in its place,
 * so no site navigation was reachable on a phone. This builds a drawer from
 * the links already in the header. Nothing is hard coded: if the nav changes,
 * the drawer changes with it, and no navigation content is duplicated in the
 * markup of 233 pages.
 *
 * Desktop is untouched. The toggle and drawer are display:none from 768px up.
 */
(function () {
  'use strict';

  function build() {
    var header = document.querySelector('header');
    if (!header || header.querySelector('.dmn-toggle')) return;

    var nav = header.querySelector('nav');
    if (!nav) return;

    var panel = document.createElement('div');
    panel.className = 'dmn-panel';
    panel.id = 'dmn-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Site navigation');

    // Keyed on destination, so a section landing page listed both as a
    // dropdown trigger and as its own first entry appears once.
    var seen = {};
    function addLink(href, text, cls) {
      if (!href || !text || href === '#') return;
      if (seen[href]) return;
      seen[href] = true;
      var a = document.createElement('a');
      a.href = href;
      a.textContent = text;
      if (cls) a.className = cls;
      panel.appendChild(a);
    }
    // The dropdown trigger is both the section name and a real destination,
    // so the heading is the link. Listing it twice was just noise.
    function addGroup(text, href) {
      if (!text) return;
      var d = document.createElement(href ? 'a' : 'div');
      d.className = 'dmn-group';
      d.textContent = text;
      if (href) { d.href = href; seen[href] = true; }
      panel.appendChild(d);
    }

    // Material Symbols render as ligatures, so the icon name is real text
    // inside the anchor. Drop the icon spans before reading a label or every
    // entry ends up saying "expand_more".
    function cleanText(el) {
      var copy = el.cloneNode(true);
      var icons = copy.querySelectorAll('.material-symbols-outlined, .material-icons');
      Array.prototype.forEach.call(icons, function (i) { i.parentNode.removeChild(i); });
      return copy.textContent.replace(/\s+/g, ' ').trim();
    }

    // Dropdown entries pair a title span with a description span. The title
    // alone is the label; the description belongs on the page, not in a menu.
    function labelFor(a) {
      var title = a.querySelector('h3, h4, strong, .font-label-md');
      return cleanText(title || a);
    }

    // Walk the nav's own children so each dropdown keeps its heading.
    // Anything unexpected falls through to a flat list of its links.
    Array.prototype.forEach.call(nav.children, function (child) {
      if (child.matches('a[href]')) {
        addLink(child.getAttribute('href'), cleanText(child));
        return;
      }

      var links = child.querySelectorAll('a[href]');
      if (!links.length) return;

      // The first anchor is the dropdown trigger and carries the group name.
      var trigger = links[0];
      if (links.length > 1) addGroup(cleanText(trigger), trigger.getAttribute('href'));
      else { addLink(trigger.getAttribute('href'), cleanText(trigger)); return; }

      Array.prototype.forEach.call(links, function (l) {
        if (l === trigger) return;
        // Every dropdown repeats the primary action in its footer. It gets one
        // prominent place at the end of the drawer instead.
        if ((l.getAttribute('href') || '').indexOf('start-your-project') !== -1) return;
        addLink(l.getAttribute('href'), labelFor(l));
      });
    });

    // The account and primary action links live outside the nav.
    var extras = header.querySelectorAll('a[href*="my.duara.dev"]');
    if (extras.length) {
      addGroup('Account');
      Array.prototype.forEach.call(extras, function (l) {
        addLink(l.getAttribute('href'), l.textContent.trim());
      });
    }
    // The same link also appears inside the dropdowns, and those are hidden on
    // mobile. Take the one in the header's own action bar, outside the nav.
    var cta = null;
    Array.prototype.forEach.call(header.querySelectorAll('a[href*="start-your-project"]'), function (l) {
      if (!cta && !l.closest('nav')) cta = l;
    });
    if (cta) addLink(cta.getAttribute('href'), cta.textContent.trim(), 'dmn-cta');

    if (!panel.querySelector('a')) return;

    var scrim = document.createElement('div');
    scrim.className = 'dmn-scrim';

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'dmn-toggle';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'dmn-panel');
    toggle.appendChild(document.createElement('span'));

    // Sit next to the existing action buttons rather than replacing anything.
    // Must be a container outside the nav, which is hidden at this width.
    var actions = cta && cta.parentElement && !cta.parentElement.closest('nav')
      ? cta.parentElement
      : null;
    if (!actions) {
      var bar = header.querySelector('nav') ? header.querySelector('nav').parentElement : header;
      actions = bar.lastElementChild && !bar.lastElementChild.closest('nav')
        ? bar.lastElementChild
        : bar;
    }
    actions.appendChild(toggle);

    document.body.appendChild(scrim);
    document.body.appendChild(panel);

    function setOpen(open) {
      panel.setAttribute('data-open', String(open));
      scrim.setAttribute('data-open', String(open));
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.setAttribute('data-dmn-open', String(open));
      if (open) {
        var first = panel.querySelector('a');
        if (first) first.focus();
      } else {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    scrim.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768 && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
  }

  /* Wide content, such as the fixed width table on the service level
   * agreement, pushed the whole page wider than the viewport. Give it its own
   * horizontal scroller so the table keeps its columns and the page does not
   * move. Table markup and content are untouched. */
  function contain() {
    var wide = document.querySelectorAll('main table, main pre');
    Array.prototype.forEach.call(wide, function (el) {
      if (el.parentElement && el.parentElement.hasAttribute('data-dmn-scroll')) return;
      var box = document.createElement('div');
      box.setAttribute('data-dmn-scroll', '');
      box.style.overflowX = 'auto';
      box.style.maxWidth = '100%';
      box.style.webkitOverflowScrolling = 'touch';
      el.parentNode.insertBefore(box, el);
      box.appendChild(el);
    });
  }

  function init() { build(); contain(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
