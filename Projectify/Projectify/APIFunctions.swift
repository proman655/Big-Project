//
//  APIs.swift
//  Projectify
//
//  Created by Gustavo Cornejo on 11/24/21.
//

import Foundation
import Alamofire

class APIFunctions {
    
    static var userID:String = ""
    static var userToken:String = ""
    static var userName:String = ""
    static var userEmail:String = ""
    static var loginStatus:String = ""
    static var registerSatus:String = ""
    static var userPic:String = ""
    
    let url:String = "https://projectify-pm.herokuapp.com/api/"
        
    func registerUser(params:Parameters) -> Int {
        
        registerRequest(params: params)
        if (APIFunctions.registerSatus == "") {
            return 0
        }
        else if (APIFunctions.registerSatus == "Us") {
            return 1
        } else {
            return -1
        }
    }
    
    func registerRequest(params:Parameters) {
        AF.request(url + "users/register", method: .post, parameters: params, encoding: JSONEncoding.default, headers: nil).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
                
                let jsonData = prettyPrintedJson.data(using: .utf8)!
                let decoder = JSONDecoder()
                do {
                    let userInfo = try decoder.decode(User.self, from: jsonData)
                    APIFunctions.userID = userInfo._id
                    APIFunctions.userToken = userInfo.token
                    APIFunctions.userName = userInfo.name
                    APIFunctions.userEmail = userInfo.email
                    APIFunctions.userPic = userInfo.pic
                } catch {
                    print(String(describing: error))
                }
            } catch {
                print("Error: Trying to convert JSON data to string")
            }
        }
    }
    
    public func loginUser(params:Parameters) -> Int {
        
        loginRequest(params: params)
        if (getLoginStatus() == "pass") {
            return 0
        } else if (getLoginStatus() == "Invalid Email or Password") {
            return 1
        } else {
            return -1
        }
    }
    
    func loginRequest(params:Parameters) -> Void {
        AF.request(url + "users/login", method: .post, parameters: params, encoding: JSONEncoding.default, headers: nil).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
                
                let errors:[String] = ["Invalid Email or Password"]
                if prettyPrintedJson.contains(errors[0]) {
                    APIFunctions.loginStatus = errors[0]
                    return
                }
                let jsonData = prettyPrintedJson.data(using: .utf8)!
                let decoder = JSONDecoder()
                do {
                    let userInfo = try decoder.decode(User.self, from: jsonData)
                    APIFunctions.userID = userInfo._id
                    APIFunctions.userToken = userInfo.token
                    APIFunctions.userName = userInfo.name
                    APIFunctions.userEmail = userInfo.email
                    APIFunctions.userPic = userInfo.pic

                } catch {
                    print(String(describing: error))
                }
                APIFunctions.loginStatus = "pass"
            } catch {
                print("Error: Trying to convert JSON data to string")
                return
            }
        }
    }
    
    func getLoginStatus() -> String {
        return APIFunctions.loginStatus
    }
    
    func getRegisterStatus() -> String {
        return APIFunctions.registerSatus
    }
    
    func getUserID() -> String {
        return APIFunctions.userID
    }
    
    func getUserToken() -> String {
        return APIFunctions.userToken
    }
    
    func getUserName() -> String {
        return APIFunctions.userName
    }
    
    func getUserEmail() -> String {
        return APIFunctions.userEmail
    }
    
    func getUserPic() -> String {
        return APIFunctions.userPic
    }
    
    func newProject(title:String, category:String, description:String, dueDate:String) {
        
        print(getUserToken())
        
        let newProjectParams:Parameters = [
            "title": title,
            "category": category,
            "content": description,
            "dueDate": dueDate,
            "favorite": false,
            "user":getUserID()
        ]
        
        let header:HTTPHeaders = [
            "Authorization": "Bearer " + getUserToken(),
            "Accept": "application/json"
        ]
    
        AF.request(url + "notes/create", method: .post, parameters: newProjectParams, encoding: JSONEncoding.default, headers: header).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
            } catch {
                print("Error: Trying to convert JSON data to string")
            }
        }
    }
    
    func deleteProject(id:String) {
        
        let header:HTTPHeaders = [
            "Authorization": "Bearer " + getUserToken(),
            "Accept": "application/json"
        ]
        
        print(id)
        let param:Parameters = [
            "_id":id
        ]
        AF.request(url + "notes/" + id, method: .delete, parameters: param, encoding: JSONEncoding.default, headers: header).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
            } catch {
                print("Error: Trying to convert JSON data to string")
            }
        }
    }
    
    func favoriteProject(id:String) {
        
        let header:HTTPHeaders = [
            "Authorization": "Bearer " + getUserToken(),
            "Accept": "application/json"
        ]
        
        let favParams:Parameters = [
            "_id":id,
            "favorite":true
        ]
        
        AF.request(url + "notes/favorite", method: .put, parameters: favParams, encoding: JSONEncoding.default, headers: header).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
            } catch {
                print("Error: Trying to convert JSON data to string")
            }
        }
    }
    
    func editProfile(params:Parameters) -> Void {
        
        let header:HTTPHeaders = [
            "Authorization": "Bearer " + getUserToken(),
            "Accept": "application/json"
        ]
        
        AF.request(url + "users/profile", method: .post, parameters: params, encoding: JSONEncoding.default, headers: header).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
                
                let errors:[String] = ["Invalid Email or Password"]
                if prettyPrintedJson.contains(errors[0]) {
                    APIFunctions.loginStatus = errors[0]
                    return
                }
                let jsonData = prettyPrintedJson.data(using: .utf8)!
                let decoder = JSONDecoder()
                do {
                    let userInfo = try decoder.decode(User.self, from: jsonData)
                    APIFunctions.userID = userInfo._id
                    APIFunctions.userToken = userInfo.token
                    APIFunctions.userName = userInfo.name
                    APIFunctions.userEmail = userInfo.email
                    APIFunctions.userPic = userInfo.pic

                } catch {
                    print(String(describing: error))
                }
                APIFunctions.loginStatus = "pass"
            } catch {
                print("Error: Trying to convert JSON data to string")
                return
            }
        }
    }
    
    
}
