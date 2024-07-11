document.addEventListener('DOMContentLoaded', () => {
    const blogPosts = [
        {
            title: 'First Blog Post',
            date: 'July 11, 2024',
            content: 'This is the content of the first blog post.',
            likes: 0,
            comments: []
        },
        {
            title: 'Second Blog Post',
            date: 'July 12, 2024',
            content: 'This is the content of the second blog post.',
            likes: 0,
            comments: []
        }
    ];

    const blogPostsContainer = document.getElementById('blogPosts');

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
        blogPosts[index].likes += 1;
        renderPosts(blogPosts);
    }

    window.addComment = function(index) {
        const comment = blogPostsContainer.querySelectorAll('.blog-post')[index].querySelector('textarea').value;
        if (comment) {
            blogPosts[index].comments.push(comment);
            renderPosts(blogPosts);
        }
    }

    document.getElementById('searchBar').addEventListener('input', (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filteredPosts = blogPosts.filter(post => post.title.toLowerCase().includes(searchQuery) || post.content.toLowerCase().includes(searchQuery));
        renderPosts(filteredPosts);
    });

    renderPosts(blogPosts);
});
