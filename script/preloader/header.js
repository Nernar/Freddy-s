/*

   Copyright 2016-2021 Nernar (github.com/nernar)
   
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
   
       http://www.apache.org/licenses/LICENSE-2.0
   
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/

const IN_CREATIVE = false;

const tryout = function(action, report, basic) {
	try {
		if (typeof action == "function") {
			return action.call(this);
		}
	} catch (e) {
		if (typeof report == "function") {
			let result = report.call(this, e);
			if (result !== undefined) return result;
		} else {
			reportError(e);
			if (report !== undefined) {
				return report;
			}
		}
	}
	return basic;
};

const isHorizon = tryout(function() {
	return Packages.com.zhekasmirnov.innercore.api.Version.INNER_CORE_VERSION.level >= 10;
}, new Function(), false);

const isLegacy = tryout(function() {
	return Packages.com.zhekasmirnov.apparatus.minecraft.version.MinecraftVersions.getCurrent().getCode() == 11;
}, new Function(), isHorizon);
