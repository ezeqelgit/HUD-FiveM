export const Hud = {
  data() {
    return {
      isVisibleHud: true,
    }
  },
  methods: {
    toggleVisibility(visibleHud) {
      this.isVisibleHud = visibleHud;
    }
  },
  mounted() {

    // setTimeout(() => {
    //   this.toggleVisibility(false);
    // }, 6000);

    // setTimeout(() => {
    //   this.toggleVisibility(true);
    // }, 7000);

    window.addEventListener("message", (event) => {
      // console.log('Message Event')

      let data = event.data;
      // console.log("Received data from server: ", data);
      switch (data.type) {
        case "visibleHud":
          this.toggleVisibility(data.isVisibleHud);
          break;
      }
    }); 
  }
};

export const leftCompScript = {
  data() {
    return {
      isDeleting: false,
      currentTime: '',
      currentDate: '',

      jobPosition: '',
      jobSpecialist: '',
      isJob: true,

      MapPosition: '',
      isLocation: true,

      notifications: [],
    };
  },
  mounted() {

    // setTimeout(() => {
    //   this.updateJobInfo('Bomzh', 'Bomzhiha');
    // }, 5000);

    // setTimeout(() => {
    //   this.handleNewNotification('1 New Notification Title', 'This is the content of the new notification.','NewUser');
    // }, 1000);

    // setTimeout(() => {
    //   this.handleNewNotification('1 New Notification Title', 'This is the content of the new notification.','NewUser');
    // }, 1000);

    // setTimeout(() => {
    //   this.handleNewNotification('2 New Notification Title', 'This is the content of the new notification.','NewUser');
    // }, 2000);

    // this.updateJobInfo("Flächeß","job");
    // this.updateLocationInfo('text text text text text text text');
    this.updateTime();
    setInterval(this.updateTime, 1000);

    window.addEventListener("message", (event) => {
      // console.log('Message Event')

      let data = event.data;
      // console.log("Received data from server: ", data);
      switch (data.type) {
        case "Job":
          this.updateJobInfo(data.jobPosition, data.jobSpecialist);
          break;
        case "Location":
          this.updateLocationInfo(data.MapPosition);
          break;
        case "Notification":
          this.handleNewNotification(data.notifications.title, data.notifications.text, data.notifications.userName);
          break;
      }
    }); 
  },
  methods: {
    updateTime() {
      const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
      this.currentTime = now.toTimeString().split(' ')[0];

      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      this.currentDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    },

    handleNewNotification(tmpTitle, tmpText, tmpUserName) {
      const newNotification = {
        title: tmpTitle,
        text: tmpText,
        userName: tmpUserName,
        isVisible: true,
      };
      this.addNotification(newNotification);
    },

    addNotification(newNotification) {
      newNotification.id = Date.now(); 
    
      if (this.notifications.length >= 4) {
        this.notifications.shift(); 
      }
    
      this.notifications.push(newNotification);
      this.setTimerForNotification(newNotification);
    },

    setTimerForNotification(notification) {
      setTimeout(() => {
        const index = this.notifications.indexOf(notification);
        if (index !== -1) {
          this.notifications.splice(index, 1);
        }
      }, 10000);
    },
  
  updateJobInfo(newJobPosition, newjobSpecialist) {
    this.jobPosition = newJobPosition;
    this.jobSpecialist = newjobSpecialist;
    this.isJob = true;
  },
  
  updateLocationInfo(newMapPosition) {
    this.MapPosition = newMapPosition;
    this.isLocation = true;
  },

},
  computed: {
    visibleNotifications() {
      return this.notifications.filter(notification => notification.isVisible);
    },

    isVisibleHud() {
      return this.$store.state.isVisibleHud;
    }
  },
};

export const middleCompScript = {
  data() {
    return {
      announceText: '',
      isAnnounceText: false,
      timerIdAnnounce: null,
      totalBlocks: 18,
      activeBlocksCount: 0,
      isLoad: false,
      loadTimer: null,
      loadingPercentage: 100,
      loadingTitle: '',
    };
  },
  mounted() {
    // this.updateLoadingProgress('Flächeß', 10000)
    // this.updateAnnounceText('Flächeß')
    window.addEventListener("message", (event) => {
      // console.log('Message Event')

      let data = event.data;
      // console.log("Received data from server: ", data);
      switch (data.type) {
        case "Announce":
          this.updateAnnounceText(data.announceText);
          break;
        case "Loading":
          this.updateLoadingProgress(data.loadingTitle, data.loadingPercentage);
          break;
      }
    });
  },
  methods: {
    updateAnnounceText(newData) {
      this.announceText = newData;
      this.isAnnounceText = true;

      if (this.timerIdAnnounce) {
        clearTimeout(this.timerIdAnnounce);
      }

      this.timerIdAnnounce = setTimeout(() => {
        setTimeout(() => {
          this.isAnnounceText = false;
        }, 500);
      }, 8000);
    },

    updateLoadingProgress(title,milliseconds) {

      this.loadingTitle = title;

      if (this.loadTimer) clearTimeout(this.loadTimer);
    
      const interval = milliseconds / this.totalBlocks; 
      let currentBlock = 0;
    
      this.isLoad = true;
    
      this.loadTimer = setInterval(() => {
        currentBlock++;
        this.activeBlocksCount = currentBlock;

        if (currentBlock >= this.totalBlocks) {
          clearInterval(this.loadTimer); 
          setTimeout(() => {
            this.isLoad = false; 
          }, 0); 
        }
      }, interval);
    },
  },
};

export const rightCompScript = {
  data() {
    return {
      weaponImagePath: '',
      visibleWeapon: false,
      currentUsers: 0,
      totalUsers: 0,
      userId: 0,
      rating: 0,
      money: 0,
      isRadioActive: false,
      weaponName: '',
      patronsInMagazine: 0,
      totalPatrons: 0,
      isRequestReceived: true,
      timerId: null,
      isSpdDisplay: false,
      currentSpeed: 0,
      maxSpeed: 0,
      rotation: 10,
      activeFuelBlocksCount: 0,
      zone: '',
      isLightActive: false,
      isDoorActive: false,
      isEngineActive: false,
      zoneStatus: 'Safe',
      currentZoneIcon: '',
      zoneStyle: {
        fill: '#E13720',
        boxShadow: '0px 4px 8.4px rgba(225, 55, 32, 0.55)'
      },
      notifications: [],
      icons: {
        dangerousZone: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none">
        <g filter="url(#filter0_d_247_48)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7083 7.01553C12.8698 8.1201 9.6366 9.0808 9.5234 9.15041C9.41028 9.22002 9.24618 9.37856 9.15882 9.5027L9 9.7284L9.00028 17.4731C9.00056 25.9816 8.99465 25.8471 9.42292 27.0758C10.756 30.9008 15.5508 35.0743 22.3994 38.3708C23.4343 38.869 23.7676 39 24 39C24.6344 39 28.6811 36.8686 30.9792 35.3241C35.6957 32.1541 38.3654 28.9569 38.8928 25.847C38.9843 25.307 38.9995 24.1202 38.9997 17.4731L39 9.7284L38.8438 9.50881C38.7578 9.38806 38.6094 9.2345 38.5139 9.16768C38.267 8.99485 24.2747 4.99111 23.9486 5.00001C23.805 5.00393 20.5469 5.9109 16.7083 7.01553Z" fill="#E13720"/>
        </g>
        <defs>
        <filter id="filter0_d_247_48" x="0.6" y="0.6" width="46.8" height="50.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="4.2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.882353 0 0 0 0 0.215686 0 0 0 0 0.12549 0 0 0 0.55 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_247_48"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_247_48" result="shape"/>
        </filter>
        </defs>
        </svg>`,

        neutralZone: `<svg xmlns="http://www.w3.org/2000/svg" width="49" height="52" viewBox="0 0 49 52" fill="none">
        <g filter="url(#filter0_d_247_55)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9653 7.01553C12.9988 8.1201 9.65782 9.0808 9.54085 9.15041C9.42395 9.22002 9.25439 9.37856 9.16411 9.5027L9 9.7284L9.00029 17.4731C9.00057 25.9816 8.99447 25.8471 9.43701 27.0758C10.8146 30.9008 15.7692 35.0743 22.846 38.3708C23.9154 38.869 24.2599 39 24.5 39C25.1556 39 29.3371 36.8686 31.7118 35.3241C36.5856 32.1541 39.3443 28.9569 39.8892 25.847C39.9838 25.307 39.9995 24.1202 39.9997 17.4731L40 9.7284L39.8385 9.50881C39.7497 9.38806 39.5964 9.2345 39.4977 9.16768C39.2426 8.99485 24.7838 4.99111 24.4469 5.00001C24.2985 5.00393 20.9318 5.9109 16.9653 7.01553Z" fill="#938D8C"/>
        </g>
        <defs>
        <filter id="filter0_d_247_55" x="0.6" y="0.6" width="47.8" height="50.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="4.2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.576471 0 0 0 0 0.552941 0 0 0 0 0.54902 0 0 0 0.55 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_247_55"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_247_55" result="shape"/>
        </filter>
        </defs>
        </svg>`,

        safeZone: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none">
        <g filter="url(#filter0_d_14_183)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7083 7.01553C12.8698 8.1201 9.6366 9.0808 9.5234 9.15041C9.41028 9.22002 9.24618 9.37856 9.15882 9.5027L9 9.7284L9.00028 17.4731C9.00056 25.9816 8.99465 25.8471 9.42292 27.0758C10.756 30.9008 15.5508 35.0743 22.3994 38.3708C23.4343 38.869 23.7676 39 24 39C24.6344 39 28.6811 36.8686 30.9792 35.3241C35.6957 32.1541 38.3654 28.9569 38.8928 25.847C38.9843 25.307 38.9995 24.1202 38.9997 17.4731L39 9.7284L38.8438 9.50881C38.7578 9.38806 38.6094 9.2345 38.5139 9.16768C38.267 8.99485 24.2747 4.99111 23.9486 5.00001C23.805 5.00393 20.5469 5.9109 16.7083 7.01553Z" fill="#69E120"/>
        </g>
        <defs>
        <filter id="filter0_d_14_183" x="0.6" y="0.6" width="46.8" height="50.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="4.2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.411765 0 0 0 0 0.882353 0 0 0 0 0.12549 0 0 0 0.55 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14_183"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_14_183" result="shape"/>
        </filter>
        </defs>
        </svg>`,
      },
      volumeLevel: 0,
      currentMicroIcon: `<svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.261 1.52957C9.79958 1.60796 9.12852 1.82766 8.70698 2.03832C8.05735 2.36304 7.65193 2.66229 7.10849 3.2182C6.3081 4.03689 5.79901 4.95675 5.49937 6.1254L5.34866 6.71308L5.32912 11.2036C5.31506 14.4341 5.32837 15.8228 5.37667 16.1524C5.57972 17.5394 6.16802 18.724 7.14461 19.7122C9.10703 21.6982 12.049 21.9663 14.287 20.363C15.3681 19.5886 16.2114 18.3945 16.592 17.0994C16.8635 16.1756 16.8715 15.9922 16.85 11.2036L16.83 6.71308L16.6812 6.132C16.3849 4.97447 15.8641 4.02968 15.0804 3.22792C14.5277 2.66253 14.1246 2.36439 13.4724 2.03832C12.7303 1.6674 12.1646 1.53568 11.2326 1.51674C10.7925 1.50776 10.3553 1.5135 10.261 1.52957ZM1.68385 13.5801C1.33009 13.7519 1.04365 14.1031 0.934838 14.4984C0.760816 15.1309 0.978158 16.9742 1.38198 18.2908C2.51464 21.9831 5.49274 24.8238 9.03016 25.586L9.6895 25.7281L9.70482 27.1721L9.72013 28.616H8.22994C7.28325 28.616 6.64306 28.642 6.47469 28.6874C6.12665 28.781 5.64133 29.2737 5.55194 29.6241C5.36832 30.344 5.65367 31.042 6.25381 31.3408L6.54624 31.4863L11.0897 31.4856C15.54 31.4848 15.6384 31.4823 15.8903 31.3602C16.2359 31.1927 16.394 31.0267 16.5546 30.6627C16.8114 30.0803 16.6894 29.4632 16.2299 29.0216C16.0538 28.8523 15.8571 28.7284 15.6954 28.6849C15.5382 28.6425 14.8655 28.616 13.9494 28.616H12.4592L12.4745 27.1721L12.4899 25.7281L13.1492 25.586C17.0992 24.7349 20.2439 21.3762 21.0953 17.0994C21.1555 16.797 21.2348 16.1646 21.2714 15.6942C21.3301 14.9418 21.3269 14.7979 21.2445 14.4984C21.1357 14.1031 20.8493 13.7519 20.4955 13.5801C19.8065 13.2455 18.8802 13.7011 18.6991 14.4635C18.666 14.6027 18.6229 14.9778 18.6034 15.2971C18.3744 19.0287 15.9849 21.9982 12.5756 22.788C11.9649 22.9294 10.3536 22.9472 9.74665 22.8191C6.27598 22.0869 3.80801 19.0784 3.57598 15.2971C3.55643 14.9778 3.51334 14.6027 3.48025 14.4635C3.29914 13.7011 2.37291 13.2455 1.68385 13.5801Z" fill="#E13720"/>
      </svg>`,
      iconsMicro: {
        greenMicro: `<svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.261 1.52957C9.79958 1.60796 9.12852 1.82766 8.70698 2.03832C8.05735 2.36304 7.65193 2.66229 7.10849 3.2182C6.3081 4.03689 5.79901 4.95675 5.49937 6.1254L5.34866 6.71308L5.32912 11.2036C5.31506 14.4341 5.32837 15.8228 5.37667 16.1524C5.57972 17.5394 6.16802 18.724 7.14461 19.7122C9.10703 21.6982 12.049 21.9663 14.287 20.363C15.3681 19.5886 16.2114 18.3945 16.592 17.0994C16.8635 16.1756 16.8715 15.9922 16.85 11.2036L16.83 6.71308L16.6812 6.132C16.3849 4.97447 15.8641 4.02968 15.0804 3.22792C14.5277 2.66253 14.1246 2.36439 13.4724 2.03832C12.7303 1.6674 12.1646 1.53568 11.2326 1.51674C10.7925 1.50776 10.3553 1.5135 10.261 1.52957ZM1.68385 13.5801C1.33009 13.7519 1.04365 14.1031 0.934838 14.4984C0.760816 15.1309 0.978158 16.9742 1.38198 18.2908C2.51464 21.9831 5.49274 24.8238 9.03016 25.586L9.6895 25.7281L9.70482 27.1721L9.72013 28.616H8.22994C7.28325 28.616 6.64306 28.642 6.47469 28.6874C6.12665 28.781 5.64133 29.2737 5.55194 29.6241C5.36832 30.344 5.65367 31.042 6.25381 31.3408L6.54624 31.4863L11.0897 31.4856C15.54 31.4848 15.6384 31.4823 15.8903 31.3602C16.2359 31.1927 16.394 31.0267 16.5546 30.6627C16.8114 30.0803 16.6894 29.4632 16.2299 29.0216C16.0538 28.8523 15.8571 28.7284 15.6954 28.6849C15.5382 28.6425 14.8655 28.616 13.9494 28.616H12.4592L12.4745 27.1721L12.4899 25.7281L13.1492 25.586C17.0992 24.7349 20.2439 21.3762 21.0953 17.0994C21.1555 16.797 21.2348 16.1646 21.2714 15.6942C21.3301 14.9418 21.3269 14.7979 21.2445 14.4984C21.1357 14.1031 20.8493 13.7519 20.4955 13.5801C19.8065 13.2455 18.8802 13.7011 18.6991 14.4635C18.666 14.6027 18.6229 14.9778 18.6034 15.2971C18.3744 19.0287 15.9849 21.9982 12.5756 22.788C11.9649 22.9294 10.3536 22.9472 9.74665 22.8191C6.27598 22.0869 3.80801 19.0784 3.57598 15.2971C3.55643 14.9778 3.51334 14.6027 3.48025 14.4635C3.29914 13.7011 2.37291 13.2455 1.68385 13.5801Z" fill="#69E120"/>
        </svg>`,

        redMicro: `<svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.261 1.52957C9.79958 1.60796 9.12852 1.82766 8.70698 2.03832C8.05735 2.36304 7.65193 2.66229 7.10849 3.2182C6.3081 4.03689 5.79901 4.95675 5.49937 6.1254L5.34866 6.71308L5.32912 11.2036C5.31506 14.4341 5.32837 15.8228 5.37667 16.1524C5.57972 17.5394 6.16802 18.724 7.14461 19.7122C9.10703 21.6982 12.049 21.9663 14.287 20.363C15.3681 19.5886 16.2114 18.3945 16.592 17.0994C16.8635 16.1756 16.8715 15.9922 16.85 11.2036L16.83 6.71308L16.6812 6.132C16.3849 4.97447 15.8641 4.02968 15.0804 3.22792C14.5277 2.66253 14.1246 2.36439 13.4724 2.03832C12.7303 1.6674 12.1646 1.53568 11.2326 1.51674C10.7925 1.50776 10.3553 1.5135 10.261 1.52957ZM1.68385 13.5801C1.33009 13.7519 1.04365 14.1031 0.934838 14.4984C0.760816 15.1309 0.978158 16.9742 1.38198 18.2908C2.51464 21.9831 5.49274 24.8238 9.03016 25.586L9.6895 25.7281L9.70482 27.1721L9.72013 28.616H8.22994C7.28325 28.616 6.64306 28.642 6.47469 28.6874C6.12665 28.781 5.64133 29.2737 5.55194 29.6241C5.36832 30.344 5.65367 31.042 6.25381 31.3408L6.54624 31.4863L11.0897 31.4856C15.54 31.4848 15.6384 31.4823 15.8903 31.3602C16.2359 31.1927 16.394 31.0267 16.5546 30.6627C16.8114 30.0803 16.6894 29.4632 16.2299 29.0216C16.0538 28.8523 15.8571 28.7284 15.6954 28.6849C15.5382 28.6425 14.8655 28.616 13.9494 28.616H12.4592L12.4745 27.1721L12.4899 25.7281L13.1492 25.586C17.0992 24.7349 20.2439 21.3762 21.0953 17.0994C21.1555 16.797 21.2348 16.1646 21.2714 15.6942C21.3301 14.9418 21.3269 14.7979 21.2445 14.4984C21.1357 14.1031 20.8493 13.7519 20.4955 13.5801C19.8065 13.2455 18.8802 13.7011 18.6991 14.4635C18.666 14.6027 18.6229 14.9778 18.6034 15.2971C18.3744 19.0287 15.9849 21.9982 12.5756 22.788C11.9649 22.9294 10.3536 22.9472 9.74665 22.8191C6.27598 22.0869 3.80801 19.0784 3.57598 15.2971C3.55643 14.9778 3.51334 14.6027 3.48025 14.4635C3.29914 13.7011 2.37291 13.2455 1.68385 13.5801Z" fill="#E13720"/>
        </svg>`,
      }
    };
  },
  mounted() {
    console.log("Mounted");

    // this.updateWeaponInfo('Navy Revlver','weapon_carbinerifle', 8, 98)
    // this.updateWeaponInfo('Navy Revlver','weapon_pistol', 8, 98)

    // setTimeout(() => {
    //   this.addMessage('1 New Notification Title', 'This is the content of the new notification.');
    // }, 1000);

    // setTimeout(() => {
    //   this.addMessage('2 New Notification Title', 'This is the content of the new notification.');
    // }, 2000);

    // setTimeout(() => {
    //   this.addMessage('3 New Notification Title', 'This is the content of the new notification.','NewUser');
    // }, 3000);

    // setTimeout(() => {
    //   this.addMessage('4 New Notification Title', 'This is the content of the new notification.','NewUser');
    // }, 4000);

    // this.addMessage('spät groß');
    // this.addMessage('4 text text');
    // this.onReceiveRequest('text text text')
    // this.updateWeaponInfo('Navy Revlver','weapon_unarmed', 8, 98)

    // this.dropWeapon();

    // this.updateUserCount(150, 455);
    // this.updateUserId(45);

    // this.initializeSpeedometer();

    // this.updateFuelBlocks(17);

    // this.updateIconsSpdOneStatus(false);
    // this.updateIconsSpdTwoStatus(false);
    // this.updateIconsSpdThreeStatus(false);

    // this.SpeedometerVisible(true);

    // this.updateSpeedometer(15, 360);

    // setTimeout(() => {
    //   this.SpeedometerVisible(true)
    // }, 1000)

    // setTimeout(() => {
    //   this.updateSpeedometer(140, 360)
    // }, 2000)

    // setTimeout(() => {
    //   this.updateSpeedometer(141, 360)
    // }, 3000)

    // setTimeout(() => {
    //   this.updateSpeedometer(140, 360)
    // }, 6000)

    // this.updateZoneStatus('Safe');
    
    // this.microLevel(2);
    // this.microWorking(false);

    window.addEventListener("message", (event) => {
      // console.log('Message Event')

      let data = event.data;
      // console.log("Received data from server: ", data);
      switch (data.type) {
        case "updateUserCount": 
          // console.log(data);
          this.updateUserCount(data.currentUsers, data.totalUsers);
          break;
        case "updateUserId":
          this.updateUserId(data.userId);
          break;
        case "visibleSpeedometer":
          this.SpeedometerVisible(data.isSpdDisplay);
          break;
        case "updateSpeed":
          this.updateSpeedometer(data.currentSpeed, data.maxSpeed);
          break;
        case "updateFuel":
          this.updateFuelBlocks(data.activeFuelBlocksCount);
          break;
        case "updateLight": 
          this.updateIconsSpdOneStatus(data.isLightActive);
          break; 
        case "updateDoor":
          this.updateIconsSpdTwoStatus(data.isDoorActive);
          break;
        case "updateEngine": 
          this.updateIconsSpdThreeStatus(data.isEngineActive);
          break;
        case "updateZone":
          this.updateZoneStatus(data.zoneStatus);
          break;
        case "setRating":
          this.setRating(data.rating);
          break;
        case "updateMoney": 
          this.updateMoney(data.money);
          break;
        case "Weapon": 
          this.updateWeaponInfo(data.weaponName, data.weaponImagePath, data.patronsInMagazine, data.totalPatrons);
          break;
        case "dropWeapon":
          this.dropWeapon();
          break;
        case "addMessage":
          this.addMessage(data.notification.notificationText);
          break;
        case "microWorking":
          this.microWorking(data.isRadioActive);
          break;
        case "microLevel":
          this.microLevel(data.volumeLevel);
          break;
      }
    });

  },
  methods: {

    updateUserCount(current, total) {
      this.currentUsers = current;
      this.totalUsers = total;
    },
    updateUserId(userId) {
      this.userId = userId;
    },
    setRating(newRating) {
      this.rating = newRating;
    },
    updateMoney(newMoney) {
      this.money = newMoney;
    },
    updateWeaponInfo(name, imgName, inMagazine, total) {
      if (name === 'No Weapon') { 
        this.visibleWeapon = false;
      } else {
        this.weaponName = name;
        this.weaponImagePath = `https://docs.altv.mp/gta/images/weapon/models/${imgName}.png`;
        this.patronsInMagazine = inMagazine;
        this.totalPatrons = total;
        this.visibleWeapon = true;
      }
    },

    dropWeapon() {
      this.visibleWeapon = false;
    },

    addMessage(newMsg) {
      const newNotification = {
        notificationText: newMsg,
        id: Date.now() + Math.random().toString()
      };
    
      this.notifications.unshift(newNotification);
      
      if (this.notifications.length > 3) {
        this.notifications.pop(); 
      }

      setTimeout(() => {
        this.notifications = this.notifications.filter(notification => notification.id !== newNotification.id);
      }, 10000);
    },

    microWorking(state) {
      if (state === true){
        this.isRadioActive = true;
        this.currentMicroIcon = this.iconsMicro.greenMicro;
      } else {
        this.isRadioActive = false;
        this.currentMicroIcon = this.iconsMicro.redMicro;
      }
    },
    microLevel(volume) {
        this.volumeLevel = volume;
    },

    SpeedometerVisible(spdDisplay) {
      if (spdDisplay === true){
        this.isSpdDisplay = true; 
        this.$nextTick(() => {
          this.initializeSpeedometer();
        });
      }
      else {
        this.isSpdDisplay = false;
      }
    },

    updateSpeedometer(tmpCurrentSpeed, tmpMaxSpeed) {
      this.maxSpeed = tmpMaxSpeed;
      this.currentSpeed = tmpCurrentSpeed;
      if (tmpCurrentSpeed > this.maxSpeed) {
        tmpCurrentSpeed = this.maxSpeed;
      }

      var path = this.$el.querySelector('.circleSpd-progress');

      if (!path) return;

      var length = path.getTotalLength();

      var newOffset = length - (tmpCurrentSpeed / 2 / this.maxSpeed * length);

      path.style.strokeDashoffset = newOffset;
      var angle = -130 + (tmpCurrentSpeed / this.maxSpeed) * 260;

      var pointer = this.$el.querySelector('.pointer');
      pointer.style.transform = `rotate(${angle}deg)`;
    },

    initializeSpeedometer() {
      var path = this.$el.querySelector('.circleSpd-progress');

      if (!path) return;
      var length = path.getTotalLength();

      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      window.getComputedStyle(path).strokeDashoffset;

      // path.style.transition = 'stroke-dashoffset 0.2s ease';
    },

    updateZoneStatus(newStatus) {
      this.zoneStatus = newStatus;

      switch (newStatus) {
        case 'Safe':
          this.zoneStyle = {
            fill: '#69E120',
            boxShadow: '0px 4px 8.4px rgba(105, 225, 32, 0.55)'
          };
          this.currentZoneIcon = this.icons.safeZone;
          break;
        case 'Dangerous':
          this.zoneStyle = {
            fill: '#E13720',
            boxShadow: '0px 4px 8.4px rgba(225, 55, 32, 0.55)'
          };
          this.currentZoneIcon = this.icons.dangerousZone;
          break;
        case 'Neutral':
          this.zoneStyle = {
            fill: '#938D8C',
            boxShadow: '0px 4px 8.4px rgba(147, 141, 140, 0.55)'
          };
          this.currentZoneIcon = this.icons.neutralZone;
          break
      }
    },
    updateFuelBlocks(activeFuelBlocksCount) {
      const blockIds = ['path1', 'path2', 'path3', 'path4', 'path5', 'path6', 'path7', 'path8', 'path9', 'path10', 'path11', 'path12', 'path13', 'path14', 'path15', 'path16', 'path17', 'path18'];

      blockIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          element.classList.remove('active');
        }
      });

      for (let i = 0; i < activeFuelBlocksCount; i++) {
        const element = document.getElementById(blockIds[i]);
        if (element) element.classList.add('active');
      }

      if (this.$refs.iconFuel === undefined) return;

      if (activeFuelBlocksCount > 0) {
        this.$refs.iconFuel.classList.add('active');
      } else {
        this.$refs.iconFuel.classList.remove('active');
      }
    },
    updateIconsSpdOneStatus(isLightActive) {
      if (this.$refs.iconsSpdOne === undefined) return;

      if (isLightActive) {
        this.$refs.iconsSpdOne.classList.add('active');
      } else {
        this.$refs.iconsSpdOne.classList.remove('active');
      }
    },
    updateIconsSpdTwoStatus(isDoorActive) {
      if (this.$refs.iconsSpdTwo === undefined) return;

      if (isDoorActive) {
        this.$refs.iconsSpdTwo.classList.add('active');
      } else {
        this.$refs.iconsSpdTwo.classList.remove('active');
      }
    },
    updateIconsSpdThreeStatus(isActive) {
      if (this.$refs.iconsSpdThree === undefined) return;

      if (isActive) {
        this.$refs.iconsSpdThree.classList.add('active');
      } else {
        this.$refs.iconsSpdThree.classList.remove('active');
      }
    },
  }
}