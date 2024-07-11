document.addEventListener('DOMContentLoaded', () => {
    const blogPosts = [
        {
            id: 1,
            title: 'First Blog Post',
            date: 'July 11, 2024',
            content: 'This is the content of the first blog post.',
            likes: 0,
            comments: []
        },
        {
            id: 2,
            title: 'Second Blog Post',
            date: 'July 12, 2024',
            content: 'This is the content of the second blog post.',
            likes: 0,
            comments: []
        }
    ];

    const blogPostsContainer = document.getElementById('blogPosts');

    function loadPostsFromStorage() {
        const storedPosts = localStorage.getItem('blogPosts');
        if (storedPosts) {
            return JSON.parse(storedPosts);
        }
        return blogPosts;
    }

    function savePostsToStorage(posts) {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }

    function renderPosts(posts) {
        blogPostsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-post';

            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <div class="meta">${post.date}</div>
                <p>${post.content}</p>
                <div class="actions">
                    <button onclick="likePost(${index})">Like (${post.likes})</button>
                </div>
                <div class="comments">
                    <textarea placeholder="Add a comment"></textarea>
                    <button onclick="addComment(${index})">Comment</button>
                    <ul>
                        ${post.comments.map(comment => `<li>${comment}</li>`).join('')}
                    </ul>
                </div>
            `;

            blogPostsContainer.appendChild(postElement);
        });
    }

    window.likePost = function(index) {
        const posts = loadPostsFromStorage();
        posts[index].likes += 1;
        savePostsToStorage(posts);
        renderPosts(posts);
    }

    window.addComment = function(index) {
        const posts = loadPostsFromStorage();
        const comment = blogPostsContainer.querySelectorAll('.blog-post')[index].querySelector('textarea').value;
        if (comment) {
            posts[index].comments.push(comment);
            savePostsToStorage(posts);
            renderPosts(posts);
        }
    }

    document.getElementById('searchBar').addEventListener('input', (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const posts = loadPostsFromStorage();
        const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchQuery) || post.content.toLowerCase().includes(searchQuery));
        renderPosts(filteredPosts);
    });

    renderPosts(loadPostsFromStorage());
});
