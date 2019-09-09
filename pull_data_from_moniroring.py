import requests

"""
    Pull Data From Monitoring Service and OutPut it to a File
"""
uri = 'http://127.0.0.1:5001/?plant-id=2&from=2019-01-01&to=2019-02-01'
class PullDataFromMonitoringService:
    def pull_data():
        files = open("monitoring_data_output.txt","w")
        request = requests.get(url=uri)
        response = request.json()
        if request.status_code == 200 and len(response):
            for _data in response:
                files.write(
                    f""" 
                        {_data}
                     """
                )
            files.close()
                
        return response

PullDataFromMonitoringService.pull_data()

