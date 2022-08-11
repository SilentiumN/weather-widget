class PositionService {
    async getPosition() {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
    }
}

export default new PositionService()