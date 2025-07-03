document.addEventListener('DOMContentLoaded', function() {
            // Create confetti effect
            const confettiContainer = document.getElementById('confetti-container');
            const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800'];
            
            function createConfetti() {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                
                // Random properties
                const color = colors[Math.floor(Math.random() * colors.length)];
                const left = Math.random() * 100;
                const animationDuration = Math.random() * 3 + 2;
                const delay = Math.random() * 2;
                const size = Math.random() * 8 + 4;
                
                confetti.style.left = `${left}%`;
                confetti.style.backgroundColor = color;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.animationDuration = `${animationDuration}s`;
                confetti.style.animationDelay = `${delay}s`;
                
                // Animation
                const keyframes = [
                    { 
                        transform: `translateY(-100px) rotate(0deg)`, 
                        opacity: 1 
                    },
                    { 
                        transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, 
                        opacity: 0 
                    }
                ];
                
                const animation = confetti.animate(keyframes, {
                    duration: animationDuration * 1000,
                    delay: delay * 1000,
                    fill: 'forwards'
                });
                
                confettiContainer.appendChild(confetti);
                
                // Remove confetti element after animation completes
                animation.onfinish = () => {
                    confetti.remove();
                };
            }
            
            // Create multiple confetti pieces
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    createConfetti();
                }, i * 100);
            }
            
            // Button click event
            document.getElementById('continueBtn').addEventListener('click', function() {
                document.querySelector('.body').style.display='none'
                document.querySelector('.next').style.display='block'
            });
        });