FROM archlinux:latest

# Install necessary utilities
RUN pacman -Syu --noconfirm && pacman -S --noconfirm \
  zsh \
  git \
  curl \
  vim \
  btop \
  tmux \
  wget \
  sudo \
  neofetch \
  base-devel \
  && pacman -Scc --noconfirm

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Install Powerlevel10k theme for a rich terminal experience
RUN git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $HOME/.oh-my-zsh/custom/themes/powerlevel10k

# Set Zsh as the default shell
RUN chsh -s $(which zsh)

# Set up a user (optional)
RUN useradd -ms /bin/zsh user && echo "user:password" | chpasswd && adduser user wheel

USER user

# Set working directory
WORKDIR /home/user

# Run Zsh by default
CMD ["zsh"]

