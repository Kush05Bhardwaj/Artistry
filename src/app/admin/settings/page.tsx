"use client";

import React from "react";
import { AdminHeader } from "@/components/admin/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/seperator";
import { Settings, Bot, Shield, Database, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Settings" description="Manage platform configuration and preferences" />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Platform Settings
              </CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" defaultValue="Artistry AI" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input id="siteUrl" defaultValue="https://artistry.ai" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">Disable access for non-admin users</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Registration</p>
                  <p className="text-sm text-muted-foreground">Allow new user signups</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Settings */}
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Configuration
              </CardTitle>
              <CardDescription>Configure AI generation settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="defaultModel">Default AI Model</Label>
                <select id="defaultModel" className="w-full h-10 px-3 rounded-md border bg-background">
                  <option value="flux-dev">Flux Dev</option>
                  <option value="gemini-flash">Gemini Flash</option>
                  <option value="stable-diffusion">Stable Diffusion</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dailyLimit">Daily Generation Limit (per user)</Label>
                <Input id="dailyLimit" type="number" defaultValue="10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tokenLimit">Token Limit per Request</Label>
                <Input id="tokenLimit" type="number" defaultValue="2048" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">NSFW Filter</p>
                  <p className="text-sm text-muted-foreground">Auto-filter inappropriate content</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Access
              </CardTitle>
              <CardDescription>Manage security and authentication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="60" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rate Limiting</p>
                  <p className="text-sm text-muted-foreground">Enable API rate limiting</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Storage Settings */}
        <TabsContent value="storage">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Storage & CDN
              </CardTitle>
              <CardDescription>Manage storage and media settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Image Storage Used</p>
                  <p className="text-2xl font-bold">2.4 GB</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Designs</p>
                  <p className="text-2xl font-bold">3,842</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                <Input id="maxFileSize" type="number" defaultValue="10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowedTypes">Allowed File Types</Label>
                <Input id="allowedTypes" defaultValue="image/jpeg,image/png,image/webp" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
