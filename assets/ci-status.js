// Fills every CI pill (<a data-ci="repo/actions/workflows/file.yml">) with the
// latest GitHub Actions result on main. shields.io caches the status, so the
// page never calls the GitHub API itself. If the lookup fails, the pill stays
// a plain "CI" link to the Actions page.
(() => {
  const label = { passing: 'CI passing', failing: 'CI failing' };
  document.querySelectorAll('[data-ci]').forEach(async (pill) => {
    const [repo, , , workflow] = pill.dataset.ci.split('/');
    try {
      const res = await fetch(`https://img.shields.io/github/actions/workflow/status/EthanYap123/${repo}/${workflow}.json?branch=main`);
      const { message } = await res.json();
      if (!label[message]) return;
      pill.dataset.state = message;
      pill.querySelector('.ci-text').textContent = label[message];
    } catch {
      // Offline or blocked: keep the neutral pill.
    }
  });
})();
