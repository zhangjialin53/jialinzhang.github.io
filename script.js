// 打字效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 滚动动画
function revealOnScroll() {
    const elements = document.querySelectorAll('.glass-effect');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
        
        if (isVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 技能进度条动画
function animateSkills() {
    const skillElements = document.querySelectorAll('.progress');
    skillElements.forEach(skill => {
        const width = skill.style.width;
        skill.style.width = '0';
        setTimeout(() => {
            skill.style.width = width;
        }, 200);
    });
}

// 粒子背景
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化打字效果
    const titleElement = document.querySelector('.typing-effect');
    if (titleElement) {
        const originalText = titleElement.innerText;
        typeWriter(titleElement, originalText);
    }

    // 初始化滚动动画
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // 创建粒子背景
    createParticles();

    // 监听滚动事件
    window.addEventListener('scroll', revealOnScroll);
    
    // 初始触发一次滚动动画
    revealOnScroll();
    
    // 初始化技能动画
    setTimeout(animateSkills, 1000);
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 表单提交处理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // 这里可以添加表单提交逻辑
        alert('消息已发送！');
        this.reset();
    });
}

// 添加粒子样式
const style = document.createElement('style');
style.textContent = `
    .particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    }

    .particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        animation: fall linear infinite;
    }

    @keyframes fall {
        0% {
            transform: translateY(-100vh);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 侧栏交互效果
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const modal = document.getElementById('fileModal');
    const modalTitle = document.getElementById('modalTitle');
    const fileList = document.getElementById('fileList');
    const closeBtn = document.querySelector('.close');

    // 添加鼠标进入效果
    sidebarLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // 添加高亮效果
            sidebarLinks.forEach(l => l.style.opacity = '0.5');
            this.style.opacity = '1';
        });

        link.addEventListener('mouseleave', function() {
            // 恢复正常效果
            sidebarLinks.forEach(l => l.style.opacity = '1');
        });
    });

    // 模拟文件数据（实际应用中应该从服务器获取）
    const files = {
        cv: [
            { name: '个人简历.pdf', path: 'cv/resume.pdf', icon: 'fa-file-pdf' },
            { name: '求职信.docx', path: 'cv/cover-letter.docx', icon: 'fa-file-word' }
        ],
        grades: [
            { name: '本科成绩单.pdf', path: 'grades/undergraduate.pdf', icon: 'fa-file-pdf' },
            { name: '研究生成绩单.pdf', path: 'grades/graduate.pdf', icon: 'fa-file-pdf' }
        ],
        awards: [
            { name: '优秀毕业生证书.pdf', path: 'awards/excellence.pdf', icon: 'fa-file-pdf' },
            { name: '竞赛获奖证书.pdf', path: 'awards/competition.pdf', icon: 'fa-file-pdf' }
        ]
    };

    // 点击侧栏链接时显示对应的文件列表
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const folder = this.dataset.folder;
            const folderFiles = files[folder];
            
            // 更新模态框标题
            modalTitle.textContent = this.querySelector('span').textContent;
            
            // 清空并重新填充文件列表
            fileList.innerHTML = '';
            folderFiles.forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.innerHTML = `
                    <div class="file-name">
                        <i class="fas ${file.icon}"></i>
                        ${file.name}
                    </div>
                    <button class="download-btn" data-path="${file.path}">
                        <i class="fas fa-download"></i> 下载
                    </button>
                `;
                fileList.appendChild(fileItem);

                // 添加渐入动画
                setTimeout(() => {
                    fileItem.style.opacity = '1';
                    fileItem.style.transform = 'translateX(0)';
                }, 50);
            });
            
            // 显示模态框
            modal.style.display = 'block';
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 50);
        });
    });

    // 关闭模态框
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // 处理文件下载
    fileList.addEventListener('click', (e) => {
        if (e.target.classList.contains('download-btn') || 
            e.target.parentElement.classList.contains('download-btn')) {
            const btn = e.target.classList.contains('download-btn') ? 
                       e.target : 
                       e.target.parentElement;
            const filePath = btn.dataset.path;
            // 实际应用中，这里应该调用服务器端的下载接口
            alert(`正在下载文件：${filePath}`);
        }
    });
}); 