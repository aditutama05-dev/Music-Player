// GitHub Codex Agent Client Module
const GitHubAgent = {
  getToken() {
    return localStorage.getItem('gh_pat_token') || '';
  },

  setToken(token) {
    localStorage.setItem('gh_pat_token', token.trim());
  },

  async request(endpoint, options = {}) {
    const token = this.getToken();
    if (!token) {
      throw new Error('GitHub PAT Token belum diatur di menu Settings.');
    }

    const res = await fetch(`https://api.github.com${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Request gagal dengan status ${res.status}`);
    }
    return res.json();
  },

  // Mengambil daftar repo user
  async listUserRepos() {
    return this.request('/user/repos?sort=updated&per_page=15');
  },

  // Membaca isi file di repo dengan decode aman UTF-8
  async getFileContent(owner, repo, path, branch = 'main') {
    const data = await this.request(`/repos/${owner}/${repo}/contents/${path}?ref=${branch}`);
    const binary = atob(data.content.replace(/\s/g, ''));
    let decoded = binary;
    try {
      decoded = decodeURIComponent(escape(binary));
    } catch (e) {
      decoded = binary;
    }
    return { sha: data.sha, content: decoded };
  },

  // Membuat commit / update file langsung ke repo
  async commitFile(owner, repo, path, content, commitMessage, sha = null, branch = 'main') {
    const body = {
      message: commitMessage,
      content: btoa(unescape(encodeURIComponent(content))),
      branch: branch
    };
    if (sha) body.sha = sha;

    return this.request(`/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }
};

window.GitHubAgent = GitHubAgent;
  
